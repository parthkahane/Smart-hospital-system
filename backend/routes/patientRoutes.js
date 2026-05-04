const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { protect } = require('../middleware/auth');

// Get patient reports (history)
router.get('/reports', protect, async (req, res) => {
    try {
        const reports = await Report.find({ patientId: req.user._id })
            .populate('doctorId', 'name specialization')
            .sort({ createdAt: -1 });
        
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update patient profile
router.put('/profile', protect, async (req, res) => {
    try {
        const { age, phone, gender, bloodGroup, address, medicalHistory, allergies } = req.body;
        
        const user = await require('../models/User').findById(req.user._id);
        
        if (user) {
            user.age = age || user.age;
            user.phone = phone || user.phone;
            user.gender = gender || user.gender;
            user.bloodGroup = bloodGroup || user.bloodGroup;
            user.address = address || user.address;
            user.medicalHistory = medicalHistory || user.medicalHistory;
            user.allergies = allergies || user.allergies;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                age: updatedUser.age,
                phone: updatedUser.phone,
                gender: updatedUser.gender,
                bloodGroup: updatedUser.bloodGroup,
                address: updatedUser.address,
                medicalHistory: updatedUser.medicalHistory,
                allergies: updatedUser.allergies
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get patient profile (for doctors)
router.get('/profile/:id', protect, async (req, res) => {
    try {
        const user = await require('../models/User').findById(req.params.id).select('-password');
        if (user && user.role === 'patient') {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

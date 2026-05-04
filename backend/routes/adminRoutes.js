const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { protect, admin } = require('../middleware/auth');

// Get all doctors (public or patient)
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get analytics data (admin only)
router.get('/analytics', protect, admin, async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({ role: 'patient' });
        const totalDoctors = await User.countDocuments({ role: 'doctor' });
        const totalAppointments = await Appointment.countDocuments();
        
        // Simple daily trend (mocked structure for Chart.js)
        const appointments = await Appointment.aggregate([
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            stats: { totalPatients, totalDoctors, totalAppointments },
            trend: appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

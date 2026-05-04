const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Book appointment
router.post('/book', protect, async (req, res) => {
    try {
        const { doctorId, date } = req.body;
        
        // Find how many appointments this doctor has on this date to assign token
        const count = await Appointment.countDocuments({ doctorId, date });
        const tokenNumber = count + 1;

        const appointment = await Appointment.create({
            patientId: req.user._id,
            doctorId,
            date,
            tokenNumber
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get patient's appointments
router.get('/my', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user._id })
            .populate('doctorId', 'name specialization')
            .sort({ date: 1, tokenNumber: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

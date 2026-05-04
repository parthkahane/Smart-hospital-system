const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');
const { protect, doctor } = require('../middleware/auth');

// Get all appointments for a logged-in doctor on a specific date (for queue)
router.get('/queue', protect, doctor, async (req, res) => {
    try {
        const date = req.query.date || new Date().toISOString().split('T')[0];
        const appointments = await Appointment.find({ doctorId: req.user._id, date: date })
            .populate('patientId', 'name age')
            .sort({ tokenNumber: 1 });
        
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update appointment status and write report
router.post('/report', protect, doctor, async (req, res) => {
    try {
        const { appointmentId, diagnosis, prescription } = req.body;
        
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        // Create Report
        const report = await Report.create({
            appointmentId: appointment._id,
            patientId: appointment.patientId,
            doctorId: req.user._id,
            diagnosis,
            prescription
        });

        // Update appointment status
        appointment.status = 'completed';
        await appointment.save();

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

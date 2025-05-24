const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Home page - List all students
router.get('/', attendanceController.getAllStudents);

// Add student routes
router.get('/add-student', attendanceController.getAddStudentForm);
router.post('/add-student', attendanceController.addStudent);

// Edit student routes
router.get('/edit-student/:id', attendanceController.getEditStudentForm);
router.post('/edit-student/:id', attendanceController.updateStudent);

// Delete student
router.get('/delete-student/:id', attendanceController.deleteStudent);

// Mark attendance routes
router.get('/mark-attendance', attendanceController.getMarkAttendanceForm);
router.post('/mark-attendance', attendanceController.markAttendance);

module.exports = router;
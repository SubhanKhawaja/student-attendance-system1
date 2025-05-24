const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render('index', { students });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getAddStudentForm = (req, res) => {
  res.render('add-student');
};

exports.addStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    const newStudent = new Student({ name, rollNumber });
    await newStudent.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getEditStudentForm = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render('edit-student', { student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, rollNumber });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getMarkAttendanceForm = async (req, res) => {
  try {
    const students = await Student.find();
    res.render('mark-attendance', { students });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { attendance } = req.body;
    
    for (const studentId in attendance) {
      const status = attendance[studentId];
      await Student.findByIdAndUpdate(studentId, {
        $push: { attendance: { status } },
      });
    }
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
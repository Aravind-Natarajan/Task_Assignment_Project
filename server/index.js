const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// ✅ Manual CORS Middleware (Render + Netlify Fix)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://t4teq-task-assignment.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// // ✅ Optional additional cors() setup
// const corsOptions = {
//   origin: 'https://t4teq-task-assignment.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// };
// app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb+srv://aravind485528:aravind485528@cluster0.sp31750.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('MongoDB error:', err));

// ✅ Registration Schema & Model
const registerSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  branch: String,
  designation: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String
});
const Register = mongoose.model('Register', registerSchema);

// ✅ Register API
app.post('/api/register', async (req, res) => {
  try {
    const { name, employeeId, branch, designation, email, phoneNumber, password } = req.body;
    const existing = await Register.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const newUser = new Register({ name, employeeId, branch, designation, email, phoneNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        employeeId: user.employeeId,
        email: user.email,
        branch: user.branch
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Task Schema & Model
const taskSchema = new mongoose.Schema({
  month: { type: String, required: true },
  givenDate: { type: String, required: true },
  completedDate: { type: String, required: true },
  workDescription: { type: String, required: true },
  assignedBy: { type: String, required: true },
  status: { type: String, default: 'Not Complete' },
  employeeId: { type: String, required: true }
});
const Task = mongoose.model('Task', taskSchema);

// ✅ Add Task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving task', error });
  }
});

// ✅ Get Tasks for employee
app.get('/api/tasks', async (req, res) => {
  const { employeeId } = req.query;
  try {
    if (!employeeId) return res.status(400).json({ message: 'employeeId is required' });
    const tasks = await Task.find({ employeeId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// ✅ Update Task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// ✅ Delete Task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting task' });
  }
});

// ✅ Get all registers (Admin)
app.get('/api/registers', async (req, res) => {
  try {
    const users = await Register.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ✅ Get single employee
app.get('/api/register/:employeeId', async (req, res) => {
  const user = await Register.findOne({ employeeId: req.params.employeeId });
  if (!user) return res.status(404).send({ message: 'User not found' });
  res.send(user);
});

// ✅ Update employee profile
app.put('/api/register/:employeeId', async (req, res) => {
  const updated = await Register.findOneAndUpdate(
    { employeeId: req.params.employeeId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).send({ message: 'Update failed' });
  res.send({ message: 'Profile updated successfully' });
});

// ✅ Skill Schema & Model
const skillSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  phoneNumber: String,
  emailId: String,
  skills: [String],
});
const Skill = mongoose.model('Skill', skillSchema);

// ✅ Add Skill
app.post('/api/skill', async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.status(201).send('Skill added');
  } catch (err) {
    res.status(400).send('Error saving skill');
  }
});

// ✅ Get skill by employeeId
app.get('/api/skill/:employeeId', async (req, res) => {
  try {
    const data = await Skill.findOne({ employeeId: req.params.employeeId });
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update skill
app.put('/api/skill/:employeeId', async (req, res) => {
  const cleanedSkills = req.body.skills.map(s => s.trim().toLowerCase()).filter(s => s);
  try {
    const updated = await Skill.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      { ...req.body, skills: cleanedSkills },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Updated', data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// ✅ Delete skill
app.delete('/api/skill/:employeeId', async (req, res) => {
  try {
    const deleted = await Skill.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

// ✅ Get all skill data
app.get('/api/skill', async (req, res) => {
  try {
    const data = await Skill.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ Email API
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anushasreeanu584@gmail.com',
        pass: 'zghp oepg hooa fktj'
      }
    });

    const mailOptions = {
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Email failed to send', error });
  }
});

// ✅ Start Server for Render (Dynamic port)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

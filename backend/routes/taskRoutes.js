import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate, priority } = req.body;

    // Verify user has access to the project
    const projectDoc = await Project.findById(project);
    if (!projectDoc || 
        (projectDoc.createdBy.toString() !== req.user.id && 
         !projectDoc.teamMembers.includes(req.user.id))) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user.id,
      dueDate,
      priority
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks for current user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ]
    })
    .populate('project', 'name')
    .populate('assignedTo createdBy', 'name email');

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/tasks/:id/status
// @desc    Update task status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is assigned to the task or created it
    if (task.assignedTo.toString() !== req.user.id && 
        task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
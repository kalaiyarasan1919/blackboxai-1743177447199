import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description, teamMembers, endDate } = req.body;

    const project = new Project({
      name,
      description,
      createdBy: req.user.id,
      teamMembers,
      endDate
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/projects
// @desc    Get all projects for current user
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { teamMembers: req.user.id }
      ]
    }).populate('createdBy teamMembers', 'name email role');

    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project with tasks
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy teamMembers', 'name email role');

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user has access to this project
    if (!project.teamMembers.includes(req.user.id) && project.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const tasks = await Task.find({ project: req.params.id })
      .populate('assignedTo createdBy', 'name email role');

    res.json({ project, tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
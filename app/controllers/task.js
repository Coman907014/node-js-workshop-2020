const Task = require('../models/taskModel');
const { ServerError } = require('../helpers/server-error');

const createTask = async (req, res) => {
  const task = new Task({ ...req.body });

  try {
      return await task.save();
  } catch (e) {
      throw new ServerError(e, 400);
  }
};

const getAllTasks = async (req, res) => {
    try {
        return await Task.find({})
    } catch(e) {
        throw new ServerError(e, 400);
    }
};

const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        return await Task.findById(taskId)
    } catch(e) {
        throw new ServerError(e, 400);
    }
};

const deleteById = async (req, res) => {
    const taskId = req.params.id;
    try {
        await Task.findByIdAndDelete(taskId)
        return taskId
    } catch(e) {
        throw new ServerError(e, 400);
    }
};

const updateById = async (req, res) => {
    const taskId = req.params.id;
    try {
        return await Task.findByIdAndUpdate(taskId, {...req.body}, {new: true})
    } catch(e) {
        throw new ServerError(e, 400);
    }
};

module.exports= {
    createTask,
    getAllTasks,
    getTaskById,
    deleteById,
    updateById
};

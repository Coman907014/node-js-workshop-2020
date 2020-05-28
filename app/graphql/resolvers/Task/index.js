const Task = require('../../../models/taskModel');

module.exports = {
  Query: {
    tasks: async () => {
      try {
        return await Task.find({});
      } catch(e) {
        throw new Error(e);
      }
    }
  },
  Mutation: {
    createTask: async (parent, { task }) => {
      const newTask = new Task({ ...task });

      try {
        return await newTask.save();
      } catch (e) {
        throw new Error(e);
      }
    },
    updateTask: async (parent, { _id, task }) => {
      let updatedTask;
      try {
        updatedTask = await Task.findByIdAndUpdate(_id, {...task}, {new: true});
      } catch(e) {
        throw new Error(e);
      }

      if (!updatedTask) {
        throw new Error(JSON.stringify({message: 'Task not found!', status: 404 }));
      }

      return updatedTask;
    },
    deleteTask: async (parent, { _id }) => {
      let deletedTask;

      try {
        deletedTask = await Task.findByIdAndDelete(_id);
      } catch(e) {
        throw new ServerError(e, 400);
      }

      if (!deletedTask) {
        throw new Error(JSON.stringify({message: 'Task not found!', status: 404 }));
      }

      return deletedTask;
    },
  }
};

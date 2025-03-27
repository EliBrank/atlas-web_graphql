import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// with virtual field, project model can access tasks with populate()
projectSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // automatically generated id for projects
    foreignField: 'projectId', // field to be matched in Task model
});

export default mongoose.model('Project', projectSchema);

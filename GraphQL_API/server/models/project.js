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

export default mongoose.model('Project', projectSchema);

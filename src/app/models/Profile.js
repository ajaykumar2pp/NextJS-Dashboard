import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

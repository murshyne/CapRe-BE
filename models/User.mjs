import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Signup fields
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Optional fields for later profile completion
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  profilePicture: { type: String },

  // Additional optional fields for later profile completion
  age: { type: Number, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  exerciseChoice: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipCode: { type: String, required: false },
  phoneNumber: { type: String, required: false },

  // Profile completion status
  profileCompleted: { type: Boolean, default: false },

  // Verification related fields
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, required: true },

  // Date user created
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

export default User;

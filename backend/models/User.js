import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'team_leader', 'team_member', 'client'],
    default: 'team_member'
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', UserSchema);
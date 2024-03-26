import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  email_address: string;
  name: string;
  profile_picture: string;
}

const userSchema: Schema<User> = new Schema({
  email_address: { type: String, required: true, unique: true },
  name: { type: String, default: "" },
  profile_picture: { type: String, default: 'https://cdn.discordapp.com/attachments/955281529481883729/960149662831087626/morty.png' }
});

const UserModel = mongoose.model<User>('users', userSchema);

export default UserModel;

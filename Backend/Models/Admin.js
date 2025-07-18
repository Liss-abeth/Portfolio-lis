import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed
});

export default mongoose.model("Admin", adminSchema);
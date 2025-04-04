import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{String, required:true},
  email:{String, required:true, unique:true},
  password:{String, required:true},
  cart:{Object , default :{}}
}, {minimize:false})

const User = mongoose.model("User", userSchema);
export default User;
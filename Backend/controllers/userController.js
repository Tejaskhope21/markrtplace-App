import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();
const login = ()=>{

}
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1h' });
};
const register = async()=>{
  const {name,email,password} = req.body;
  try{
const exist = await User.findOne({email});
if(exist){
    return res.status(400).json({message:"User already exists"}) 
}
if(!validator.isEmail(email)){
    return res.status(400).json({message:"Invalid email"})
}
if(password.length<6){
    return res.status(400).json({message:"Password should be at least 6 characters"})
}
const salt =await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password,salt);

const newUser = await User.create({
  name,
  email,
  password:hashedPassword
});

const savedUser = await newUser.save();
const token = createToken(savedUser)
res.json({success:true,token})

}catch(error){
    return res.status(500).json({message:error.message})}
}

export default {login,register}
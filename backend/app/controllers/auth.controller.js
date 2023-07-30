import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from "../models/user.js"
// const db = require();

const secret= "bezkoder-secret-key";


export const signup = async(req, res) => {
  const {email,password,username} = req.body;
  
  try {
    const oldUser = await User.findOne({email})

    if (oldUser) {
      return res.status(400).json({message: "User Already Exist"})
    }
    const hashPassword = await bcrypt.hash(password,12);

    const result = await User.create({
      email,
      password: hashPassword,
      username
    });

    const token = jwt.sign({email: result.email, id: result._id},secret, {expiresIn: "1h"});
    res.status(200).send({
     email: result.username,
     id: result._id,
      accessToken: token
    });
    console.log(result)
    // res.status(201).json({,token});
    // res.send({ message: "User was registered successfully!" }); 
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
};
// 
export const signin = async(req, res) => {
  const {password,username} = req.body;
  try {
    const oldUser = await User.findOne({username});

    if (!oldUser) return res.status(404).json({message: "user doesn't exist"});

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credential"});

    const token = jwt.sign({ id: oldUser.id },
      secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      })
     res.status(200).send({
      id: oldUser._id,
      username: oldUser.username,
      email: oldUser.email,
      accessToken: token
    });

  
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
     

    
    
};

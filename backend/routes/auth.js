import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { sign } = jwt;

const router = Router();

router.post('/register', async (req, res) => {
    const { name, email, roles, permissions } = req.body;
    let {password} = req.body;
    password = await bcrypt.hash(password, 10);
    try {
     const response = await User.create({
        name,
        email,
        password,
        roles,
        permissions
      });
      console.log('user created successfully: ', response);
    } catch (error) {
      if(error.code === 11000){
        return res.json({status: 'error', message: 'Email is already in use'});
      } 
      console.log(error.message);
      throw error;
    }
   return res.json({status: 'ok'});
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if(!user) {
    return res.json({status: 'error', message: 'Invalid Credentials'});
  }

  if(await bcrypt.compare(password, user.password)) {
    // successfully logged in
    
    const token = sign(
      {
        // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      roles: user.roles,
      permissions: user.permissions
      }, 
      process.env.JWT_SECRET,
      {algorithm: 'HS256'});
      
    return res.json({status: 'ok', data: token});
  }
  console.log('Incorrect login attempt for user:', email);
  return res.json({status: 'error', message: 'Invalid Credentials'});
});

export default router;
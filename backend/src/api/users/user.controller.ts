import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../../config/config';
import User from '../../models/user.model';
import * as jwt from 'jsonwebtoken';
import { ResponseBody } from '../../utils/types';

export const authenticate = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found.'
      });
    }

    const matchPasswords = await bcrypt.compare(password, user.password);
    if(!matchPasswords) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized.'
      });
    }

    const payload = {
      user: {
        id: user.id,
      }
    };

    jwt.sign(
      payload,
      config.JWT_ENCRYPTION,
      { expiresIn: 36000 },
      (err, token) => {
        if(err) throw err;
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully.',
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            token
          }
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    });
  }
}

export const register = async (req: Request, res: Response): Promise<Response<ResponseBody>> => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, parseInt(config.SALT_ROUNDS, 10));

    const user = new User({
      name,
      email, 
      password: hash
    });

    const newUser = await user.save();

    return res.status(202).json({
      success: true,
      message: 'User successfully created',
      data: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString()
    })
  }
}
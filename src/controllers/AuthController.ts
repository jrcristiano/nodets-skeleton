import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import env from '../../env';
import IUser from '../interfaces/IUser';
import UserService from '../services/UserService';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array(),
        });
      }

      const user = await UserService.findUserByEmail(email) as IUser;
      if (!user) {
        return res.status(404).json({
          message: 'User not found.',
        });
      }

      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (!verifyPassword) {
        return res.status(403).json({
          message: 'Incorrect password, please try again.',
        });
      }

      delete user.password;

      const token = jwt.sign({user}, env.API_SECRET_TOKEN, {
        expiresIn: env.API_SECRET_TOKEN,
      });

      return res.status(200).json({
        token,
        expiresIn: env.API_SECRET_TOKEN,
      });

    } catch ({message}) {
      return res.status(500).json({
        message
      });      
    }
  }
}

export default new AuthController;
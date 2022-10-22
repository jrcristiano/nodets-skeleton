import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from '../services/UserService';
import IUser from '../interfaces/IUser';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import env from '../../env';

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
        expiresIn: env.TOKEN_EXPIRES_IN,
      });

      return res.status(200).json({
        token,
        expiresIn: env.TOKEN_EXPIRES_IN,
      });

    } catch ({ message }) {
      return res.status(500).json({ message });      
    }
  }
}

export default new AuthController;
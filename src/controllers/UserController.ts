import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import env from '../../env';
import HttpStatus from '../enums/HttpStatus';
import IUser from '../interfaces/IUser';
import UserService from '../services/UserService';

class UserController {
  async index(req: Request, res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
				status: HttpStatus.OK,
        data: await UserService.getUserListWithoutPassword(req),
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        return res.status(HttpStatus.BAD_REQUEST).json({
					status: HttpStatus.BAD_REQUEST,
          message: errors.array(),
        });
      }

      const body = req.body as IUser;
      body.password = bcrypt.hashSync(body.password, env.API_PASSWORD_SALT);

      return res.status(HttpStatus.CREATED).json(await UserService.create(req.body));
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }
  }

  async show({ params }: Request, res: Response) {
    try {
      const user = await UserService.findById(params.id) as IUser;
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
					status: HttpStatus.NOT_FOUND,
          message: `User ${params.id} not found!`,
        })
      }

      return res.status(HttpStatus.OK).json(user);
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        return res.status(400).json({
					status: HttpStatus.BAD_REQUEST,
          message: errors.array(),
        })
      }

      const body = req.body as IUser;
      if (body.password) {
        body.password = bcrypt.hashSync(body.password, env.API_PASSWORD_SALT);
      }

      await UserService.update(req.params.id, req.body);
      return res.status(200).json({
				status: HttpStatus.OK,
        message: `User ${req.params.id} updated successfully.`,
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }
  }

  async destroy({ params }: Request, res: Response) {
    try {
      await UserService.forceDelete(params.id);
      return res.status(200).json({
				status: HttpStatus.OK,
        message: `User ${params.id} removed successfully.`,
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }
  }
}

export default new UserController;


import { Request } from "express";
import User from "../entities/User";
import AbstractService from "./AbstractService";

class UserService extends AbstractService<User> {
  constructor() {
    super(User);
  }

  async findUserByEmail(email: string) {
    return await this.repository.findOne({
      where: { email },
    });
  }

	async getUserListWithoutPassword(req: Request) {
		const users = await this.getAll(req);
		return users.map(({ id, name, lastname, email, created_at, updated_at }: User) => {
			return {
				id,
				name,
				lastname,
				email,
				created_at,
				updated_at,
			}
		});
	}
}

export default new UserService;

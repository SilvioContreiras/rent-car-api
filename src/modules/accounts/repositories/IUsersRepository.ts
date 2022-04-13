import { ICreateUsersDTO } from "../dtos/ICreatedUsersDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User | void>;
}

export { IUsersRepository }
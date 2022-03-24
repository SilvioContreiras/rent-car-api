import { ICreateUsersDTO } from "../dtos/ICreatedUsersDTO";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository }
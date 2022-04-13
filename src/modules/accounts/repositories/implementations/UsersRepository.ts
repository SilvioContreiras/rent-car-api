import { getRepository, Repository } from "typeorm";
import { ICreateUsersDTO } from "../../dtos/ICreatedUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password, driver_licence }: ICreateUsersDTO): Promise<void> {
    
    const user = this.repository.create({ 
      name, email, password, driver_licence 
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | void> {
    const user =  await this.repository.findOne({ email })
    return user;
  }
}

export { UsersRepository }
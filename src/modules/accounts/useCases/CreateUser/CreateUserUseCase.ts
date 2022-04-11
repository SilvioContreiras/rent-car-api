import { inject, injectable } from 'tsyringe'
import { ICreateUsersDTO } from '../../dtos/ICreatedUsersDTO'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) {}
  
  async execute({ name, password, email, username, driver_licence }: ICreateUsersDTO): Promise<void> {
    await this.userRepository.create({ 
      name, password, email, username, driver_licence
    })
  }
}

export { CreateUserUseCase }
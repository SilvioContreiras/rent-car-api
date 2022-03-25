import { inject } from 'tsyringe'
import { ICreateUsersDTO } from '../../dtos/ICreatedUsersDTO'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'

class CreateCategoryUseCase {
  constructor(@inject('UsersRepository')
  private userRepository: UsersRepository) {}
  
  async execute({ name, password, email, driver_licence, username }: ICreateUsersDTO): Promise<void> {
    await this.userRepository.create({ 
      name, password, email, driver_licence, username
    })
  }
}

export { CreateCategoryUseCase }
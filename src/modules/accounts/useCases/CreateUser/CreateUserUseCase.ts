import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { ICreateUsersDTO } from '../../dtos/ICreatedUsersDTO'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) {}
  
  async execute({ name, password, email, driver_licence }: ICreateUsersDTO): Promise<void> {

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }
    
    const hashedPassword = await hash(password, 8)
    
    await this.userRepository.create({ 
      name, 
      password: hashedPassword, 
      email, 
      driver_licence
    })
  }
}

export { CreateUserUseCase }
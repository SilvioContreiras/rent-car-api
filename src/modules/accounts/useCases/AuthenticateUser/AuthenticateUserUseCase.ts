import { compare } from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { AppError }  from '../../../../errors/AppError';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },

  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

   async execute({ email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email or password invalid");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email or password invalid");
    }

    const token = sign({}, '4a9059b6aebc22bfa40d785e0ae5da4d', {
      subject: user.id,
      expiresIn: '1d'
    })

    const tokenValue : IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    } 

    return tokenValue

   }
}

export { AuthenticateUserUseCase }
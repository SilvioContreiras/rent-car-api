import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}


export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token not provided');
  }

  const [, token] = authHeader.split(' ')

  try {
     const { sub: user_id } = verify(token, '4a9059b6aebc22bfa40d785e0ae5da4d') as IPayload;

     const userRepository = new UsersRepository();

     const user = await userRepository.findById(user_id);

     if (!user) {
        throw new Error('User not found');
     }

     next();

  } catch {
    throw new Error('Token invalid');
  }
}
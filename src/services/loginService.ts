import { createErrorMessage } from '../utils/functions';
import { userSchema } from '../schemas/schemas';
import { generateToken } from '../auth/jwtConfig';
import { findByUserNameModel } from '../models/usersModel';
import { compare } from 'bcrypt';

interface IRequest {
  password: string,
  name: string,
}

const verifyDataFromRequestBody = (data: IRequest) => {
  const { error } = userSchema.validate(data);
  if (error) throw createErrorMessage(406, error.message);
};

const verifyIsAdminAndDatas = async (user: IRequest) => {
  const userFound = await findByUserNameModel(user.name);
  const isPasswordCorrect = await compare(user.password, userFound.password);
  if (!userFound || !isPasswordCorrect) {
    throw createErrorMessage(401, 'user or password incorrect');
  }
  return userFound;
}

const loginService = async (user: IRequest) => {
  verifyDataFromRequestBody(user);
  const userFound = await verifyIsAdminAndDatas(user);
  const payloadToken = `${userFound.name} ${userFound.role}`
  const token = generateToken({ payload: payloadToken });
  return { token };
};

export {
  loginService,
}

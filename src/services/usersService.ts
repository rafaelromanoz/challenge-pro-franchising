import { createErrorMessage } from '../utils/functions';
import { userSchema } from '../schemas/schemas';
import { hash } from 'bcrypt';
import { findByUserNameModel, registerUserModel } from '../models/usersModel';

interface IUser {
  name: string;
  password: string;
}

const verifyDataFromRequest = (user: IUser) => {
  const { error } = userSchema.validate(user);
  if (error) throw createErrorMessage(400, error.message);
}

const verifiUserExists = async (name: string) => {
  const userExists = await findByUserNameModel(name);
  if (userExists) throw createErrorMessage(400, 'user already exists');
}
const registerOwnerService = async (user: IUser) => {
  verifyDataFromRequest(user);
  await verifiUserExists(user.name);
  const { name,  password } = user;
  const passwordEncript = await hash(password, 8);
  const userCreate = {
    name,
    password: passwordEncript,
    role: 'admin',
  }
  const { id } = await registerUserModel(userCreate);
  return {
    id,
    name
  }
};

const registerShopkeeperService = async (user: IUser) => {
   verifyDataFromRequest(user);
  await verifiUserExists(user.name);
  const { name,  password } = user;
  const passwordEncript = await hash(password, 8);
  const userCreate = {
    name,
    password: passwordEncript,
    role: 'user',
  }
  const { id } = await registerUserModel(userCreate);
  return {
    id,
    name
  }
}

export {
  registerOwnerService,
  registerShopkeeperService,
}

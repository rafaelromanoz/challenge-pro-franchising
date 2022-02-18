import { createErrorMessage } from '../utils/functions';
import { userSchema } from '../schemas/schemas';

interface IUser {
  name: string;
  password: string;
}

const verifyDataFromRequest = (user: IUser) => {
  const { error } = userSchema.validate(user);
  if (error) throw createErrorMessage(400, error.message);
}
const registerOwnerService = (user: IUser) => {
  verifyDataFromRequest(user);
  
};

export {
  registerOwnerService,
}

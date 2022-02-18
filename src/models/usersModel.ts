import connection from "./connection";

interface IUser {
  password: string,
  name: string,
}

const registerUserModel = async (user: IUser) => {
  const instanceConn = await connection();
  const { insertedId } = await instanceConn.collection('users').insertOne({ ...user });
  return {
    id: insertedId,
  }
};

const findByUserNameModel = async (name: string) => {
  const instanceConn = await connection();
  const userFound = await instanceConn.collection('users').findOne({ name });
  return userFound;
}

export {
  registerUserModel,
  findByUserNameModel,
}

import connection from '../models/connection';
import { hash } from 'bcrypt';

const insertUserAdmin = async () => {
  const passwordEncripted = await hash('passuser', 8);
  const instanceDb = await connection();
  await instanceDb.collection('users').insertOne({
    name: 'admin',
    password: passwordEncripted,
    admin: true
  });
};

insertUserAdmin();



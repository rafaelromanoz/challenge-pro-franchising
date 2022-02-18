const { hash } = require('bcrypt');
const {MongoClient} = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
        db = conn.db('challenge_pro_franchising');
        return db;
      });
};

const insertUserAdmin = async () => {
  const passwordEncripted = await hash('admin', 8);
  const instanceDb = await connection();
  await instanceDb.collection('users').insertOne({
    name: 'admin',
    password: passwordEncripted,
    role: 'admin',
  });
  console.log('Banco populado');
  process.exit();
};

insertUserAdmin();



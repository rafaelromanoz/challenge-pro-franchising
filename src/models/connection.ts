import { MongoClient } from "mongodb";

const OPTIONS: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodbUrl = 'mongodb://localhost:27017/';

let db: null | any = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(mongodbUrl, OPTIONS).then((conn) => {
        db = conn.db('challenge_pro_franchising');
        return db;
      });
};

export default connection;

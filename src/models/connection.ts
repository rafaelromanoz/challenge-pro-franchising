import { MongoClient } from "mongodb";

const OPTIONS: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodburl = 'mongodb://mongo:27017/';

let db: null | any = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(mongodburl, OPTIONS).then((conn) => {
        db = conn.db('challenge_pro_franchising');
        return db;
      });
};

export default connection;

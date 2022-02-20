import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const DBSERVER = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBSERVER.getUri();
  const OPTIONS: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return MongoClient.connect(URLMock, OPTIONS);
};

export { getConnection };

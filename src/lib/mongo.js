const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
     if (!MongoConnect.connection) {

      MongoConnect.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
        if (err) {
           reject(err);
        }
        console.log('Connected succesfully to mongo');
        resolve(this.client.db(this.dbName));
        });
      });

      }
      return MongoConnect.connection;
  }

  async getAll(table) {
    const db = await this.connect();
    const collection = await db.collection(table).find({}).toArray();
    return collection;
  }
//   Aún no funciona este método el filtro
  async getProduct(table, id) {
     const db = await this.connect();
     const collection = await db.collection(table).findOne({ '_id': id});
     return collection;
  }

  async postProduct(table, product) {
     const db = await this.connect();
     const collection = await db.collection(table, product).insertMany([ product ]);
     return collection;
  }

  //   Aún no funciona este método el filtro
  async patchProduct(table, id, data) {
     const db = await this.connect();
     const collection = await db.collection(table).updateOne({ 'id': id }, { $set: data });
     return collection;
  }

  //   Aún no funciona este método el filtro
  async deleteProduct(table, id) {
     const db = await this.connect();
     console.log({ id });
     const collection = await db.collection(table).deleteOne({ '_id': id });
     return collection;
  }
}

module.exports = MongoConnect;

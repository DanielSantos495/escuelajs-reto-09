const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');
const { ObjectId } = require('mongodb');

class ProductService {

  constructor() {
     this.mongoDB = new MongoConnect();
     this.collection = 'products'
  }

  async getAllProducts() {
     try {
       const products = this.mongoDB.getAll(this.collection);
       return products || [];
     } catch(err) {
        console.error(err);
        return;
     }
  }
//   Aún no funciona este método
  async getProduct(id) {
     try {
        const product = this.mongoDB.getProduct(this.collection, id);
        return product || []
     } catch(err) {
        console.error(err)
        return;
     }
  }

  postProduct(data) {
    try {
       const product = this.mongoDB.postProduct(this.collection, data);
       return product || []
    } catch(err) {
       console.error(err)
       return;
    }
  }

//   Aún no funciona este método
  patchProduct(id, data) {
     try {
        const product = this.mongoDB.patchProduct(this.collection, id, data);
        return product || [];
     } catch(err) {
        console.error(err);
        return;
     }
  }

//   Aún no funciona este método
  deleteProduct(id) {
     try {
        this.mongoDB.deleteProduct(this.collection, id);
     } catch(err) {
        console.log(err)
        return;
     }
}
}

module.exports = ProductService;

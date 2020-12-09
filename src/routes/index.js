const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  const getAllProducts = async (req, res, next) => {
    try {
       const storeProducts = await productService.getAllProducts()
       res.status(200).json(storeProducts);
    } catch(err) {
       console.log(err);
       res.status(500).status('Internal error');
    }
  }
  const getProduct = async (req, res, next) => {
	 const { params } = req;
	 try {
	 	const storeProducts = await productService.getProduct(params.id)
	 	res.status(200).json(storeProducts);
	 } catch(err) {
	 	console.log(err);
	 	res.status(500).status('Internal error');
	 }
  }

  const postProducts = async (req, res, next) => {
	 try {
	 	const { body } = req;
	 	const product = await productService.postProduct(body);
	 	res.status(200).send({
			 message: 'Added product',
			 product
		 });
	 } catch(err) {
	 	console.log(err);
	 	res.status(500).status('Internal error');
	 }
  }
  const patchProducts = async (req, res, next) => {
    try {
    	const { body, params } = req;
		const product = await productService.patchProduct(params.id, body.message);
    	res.status(200).send({
			message:'Update product',
			updateProduct: product,
		} );
    } catch(err) {
    	console.log(err);
    	res.status(500).status('Internal error');
    }
  }
  const deleteProducts = async (req, res, next) => {
	 try {
	 	const { params } = req;
		  productService.deleteProduct(params.id);
	 	res.status(200).send({
	 	  message:'Delete product',
	   } );
	 } catch(err) {
	 	console.log(err);
	 	res.status(500).status('Internal error');
	 }
  }

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', getAllProducts);
  router.get('/products/:id', getProduct);
  router.post('/products', postProducts);
  router.patch('/products/:id', patchProducts);
  router.delete('/products/:id', deleteProducts);

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;
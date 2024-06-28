const express = require('express');
const router = express.Router();

const { getCartData,addToCart, getData, getBookById, createBook, deleteBook, updateBook } = require('../controller/books.controllers')

router.get('/', getData);
router.get('/search/:id', getBookById);
router.post('/create', createBook);
router.delete('/delete/:id', deleteBook);
router.put('/update/:id', updateBook)
router.post('/add/:id', addToCart)
router.get('/cart', getCartData);

module.exports = router;


const express = require('express');
const { checkAccessToken, checkAuthorizationAdmin } = require('../middleware/auth');
const { getItems, getItemById, getItemsPagination, createNewItem, updateItem, deleteItem } = require('../controller/itemController');
const itemRoute = express.Router();

itemRoute.get('/', checkAccessToken, getItems)
itemRoute.get('/detail/:id', checkAccessToken, getItemById)
itemRoute.get('/pagination', checkAccessToken, getItemsPagination)

itemRoute.post('/', checkAccessToken, checkAuthorizationAdmin, createNewItem)
itemRoute.put('/:id', checkAccessToken, checkAuthorizationAdmin, updateItem)
itemRoute.delete('/:id', checkAccessToken, checkAuthorizationAdmin, deleteItem)

module.exports = itemRoute;
const { handleResponseSuccess, handleResponseError } = require("../utils/response")

const items = [
    {id: 1, name: 'item 1', description: 'description 1'},
    {id: 2, name: 'item 2', description: 'description 2'},
    {id: 3, name: 'item 3', description: 'description 3'},
    {id: 4, name: 'item 4', description: 'description 4'},
    {id: 5, name: 'item 5', description: 'description 5'},
    {id: 6, name: 'item 6', description: 'description 6'},
    {id: 7, name: 'item 7', description: 'description 7'},
    {id: 8, name: 'item 8', description: 'description 8'},
    {id: 9, name: 'item 9', description: 'description 9'},
    {id: 10, name: 'item 10', description: 'description 10'},
    {id: 11, name: 'item 11', description: 'description 11'},
    {id: 12, name: 'item 12', description: 'description 12'},
]

const getItems = (req, res) => {
    handleResponseSuccess(res, 200, 'Get Items Successfully', {items})
}

const getItemById = (req, res) => {
    const {id} = req.params
    console.log('id', {id})
    const checkedItem = items.find(item => item.id === parseInt(id))
    if(!checkedItem) {
        handleResponseError(res, 404, 'Item Not Found')
        return;
    }
    handleResponseSuccess(res, 200, 'Get Item by Id Successfully', {checkedItem})
}

const getItemsPagination = (req, res) => {
    const {pageIndex, limit} = req.query
    console.log('typeof pageIndex', typeof pageIndex)
    console.log('typeof limit', typeof limit)

    const startIndex = (pageIndex - 1) * limit
    const endIndex = startIndex + limit -1
    let result = {
        data: items.slice(startIndex, endIndex + 1),
        itemsPerPage: limit,
        currentPage: pageIndex,
        totalPages: Math.ceil(items.length / limit)
    }
    handleResponseSuccess(res, 200, 'Get Items Pagination Successfully', {result})
}

const createNewItem = (req, res) => {
    const {name, description} = req.body;
    if(!name) {
        handleResponseError(res, 400, 'Name is required')
        return;
    }
    if(!description) {
        handleResponseError(res, 400, 'Description is required')
        return;
    }
    const newItem = {
        id: items.length + 1,
        name,
        description
    }
    items.push(newItem)
    handleResponseSuccess(res, 200, 'Create new item successfully', {newItem})
}

const updateItem = (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    let checkedItem = items.find(item => item.id === parseInt(id))
    if(!checkedItem) {
        handleResponseError(res, 404, 'Item id Not Found')
        return;
    }
    if(!name) {
        handleResponseError(res, 400, 'Name is required')
        return;
    }
    if(!description) {
        handleResponseError(res, 400, 'Description is required')
        return;
    }
    checkedItem = {...checkedItem, name, description}
    handleResponseSuccess(res, 200, 'Update item successfully', {checkedItem})
}

const deleteItem = (req, res) => {
    const {id} = req.params;
    const checkedItemIndex = items.findIndex(item => item.id === parseInt(id))
    if(checkedItemIndex === -1) {
        handleResponseError(res, 404, 'Item id Not Found')
        return;
    }
    items.splice(checkedItemIndex, 1)
    handleResponseSuccess(res, 200, 'Delete Item Successfully', {})
}

module.exports = {
    getItems,
    getItemById,
    getItemsPagination,
    createNewItem,
    updateItem,
    deleteItem,
}
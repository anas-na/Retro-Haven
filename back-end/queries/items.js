const db = require("../db/dbConfig");

const getAllItems = async () => {
    try {
        const allItems = await db.any("SELECT * FROM items");
        return allItems;
    } catch (error) {
        console.log(error);
    }
};

const getUnsoldItems = async () => {
    try {
        const allItems = await db.any("SELECT * FROM items WHERE sold = False");
        return allItems;
    } catch (error) {
        console.log(error);
    }
};
const getSoldItems = async () => {
    try {
        const allItems = await db.any("SELECT * FROM items WHERE sold = True");
        return allItems;
    } catch (error) {
        console.log(error);
    }
};





const getItem = async (id) => {
    try {
        const item = await db.one(`SELECT * FROM items WHERE id = $1`, id);
        return item;
    } catch (error) {
        console.log(error);
    }
};

const createItem = async (newItem) => {
    const { category_id, photo, name, description, price, location, listedby_id } = newItem;
    try {
        const createdItem = await db.one(
            `INSERT INTO items( category_id, photo, name, description, price, location, listedby_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [category_id, photo, name, description, price, location, listedby_id]
        );
        return createdItem;
    } catch (error) {
        console.log(error);
    }
};

const updateItem = async (id, item) => {
    try {
        console.log(item)
        const {boughtby_id, sold } = item;
        const query = "UPDATE items SET boughtby_id = $1, sold = $2  WHERE id = $3 RETURNING *";
        const updatedItem = await db.one(query, [boughtby_id, sold, id]);
        return updatedItem;
    } catch (error) {
        return error;
    }
};

const deleteItem = async (id) => {
    try {
        const query = "DELETE FROM items WHERE id = $1 RETURNING *";
        const deletedItem = await db.one(query, id);
        return deletedItem;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    getUnsoldItems,
    getSoldItems
};
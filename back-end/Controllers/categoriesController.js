const express = require("express");
const categories = express.Router();
const {
    getAllCategories,
    getCategory,
    getCategoryItems
} = require("../queries/categories");

categories.get("/", async (req, res) => {
    res.json(await getAllCategories());
});

categories.get("/:id", async (req, res) => {
    res.json(await getCategory());
});

categories.get("/:id/items", async (req, res) => {
    const { id } = req.params;
    res.json(await getCategoryItems(id))
})

module.exports = categories;


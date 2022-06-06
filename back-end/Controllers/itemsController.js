const express = require("express");
const items = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
  getSoldItems,
  getUnsoldItems
} = require("../queries/items.js");

items.get("/", async (req, res) => {
  res.json(await getAllItems())
});

items.get("/itemssold", async (req, res) => {
  res.json(await getSoldItems())
});

items.get("/availableitems", async (req, res) => {
  res.json(await getUnsoldItems())
});


items.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await getItem(id));
});

items.post("/", async (req, res) => {
    res.json(await createItem(req.body));
}); 

items.put("/:id", async (req, res) => {
    const { id } = req.params
    res.json(await updateItem(id, req.body))
});

items.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await deleteItem(id))
});

module.exports = items;

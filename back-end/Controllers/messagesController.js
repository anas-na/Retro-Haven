const express = require("express");
const messages = express.Router();
const {
  getAllMessages,
  createMessage,
  deleteMessage
} = require("../queries/messages.js");

messages.get("/", async(req, res) => {
    res.json(await getAllMessages())
})

messages.post("/", async(req, res) => {
    res.json(await createMessage(req.body))
})

messages.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await deleteMessage(id))
});

module.exports = messages;

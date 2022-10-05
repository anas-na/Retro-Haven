const express = require("express");
const messages = express.Router();
const {
  getAllMessages,
  createMessage,
  deleteMessage,
//   userSentMessages
  getUserMessages
} = require("../queries/messages.js");

messages.get("/", async(req, res) => {
    res.json(await getAllMessages())
})

// messages.get("/:user_id", async(req, res) => {
//     const  user_id  = req.params.user_id;
//     res.json(await getUserMessages(user_id))
// })

messages.get("/:sender_id/:receiver_id", async(req, res) => {
    const sender_id  = req.params.sender_id;
    const receiver_id = req.params.receiver_id
    res.json(await getUserMessages(sender_id, receiver_id))
})

messages.post("/", async(req, res) => {
    res.json(await createMessage(req.body))
})

messages.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await deleteMessage(id))
});

module.exports = messages;

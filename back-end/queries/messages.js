const db = require("../db/dbConfig");

const getAllMessages = async () => {
  try {
    const allMessages = await db.any(`SELECT * FROM messages`);
    return allMessages;
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async newMessage => {
  const { sender_id, receiver_id, message } = newMessage;
  try {
    const createdMessage = await db.one(
      `INSERT INTO messages(sender_id, receiver_id, message) VALUES ($1, $2, $3) returning *`,
      [sender_id, receiver_id, message]
    );
    return createdMessage;
  } catch (error) {
    console.log(error);
  }
};

const deleteMessage = async id => {
  try {
    const query = "DELETE FROM messages WHERE id = $1 RETURNING *";
    const deletedMessage = await db.one(query, id);
    return deletedMessage;
  } catch (error) {}
};
module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage
};

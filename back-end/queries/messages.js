const db = require("../db/dbConfig");

const getAllMessages = async () => {
  try {
    const allMessages = await db.any(`SELECT * FROM messages`);
    return allMessages;
  } catch (error) {
    console.log(error);
  }
};

const getUserMessages = async (sender_id, receiver_id) => {
  try {
    const userMessages = await db.any(
      `SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY sent_at ASC `, [sender_id, receiver_id]
    );
    return userMessages;
  } catch (error) {
    console.log(error);
  }
};

//User's sent messages
// const getUserSentMessages = async (user_id) => {
//   try {
//     const userSentMessages = await db.any(
//       `SELECT * FROM messages WHERE sender_id = $1 RETURNING *`, user_id
//     );
//     return userSentMessages;
//   } catch (error) {
//     console.log(error);
//   }
// };

const createMessage = async newMessage => {
  const { sender_id, receiver_id, message } = newMessage;
  try {
    const createdMessage = await db.one(
      `INSERT INTO messages(sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *`,
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
  deleteMessage,
  // getUserSentMessages,
  getUserMessages
};

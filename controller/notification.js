const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const getNotifications = (req, res) => {
    connection.query('SELECT * FROM notification', (err, result) => {
        if (err) {
        console.error('Error fetching notifications:', err);
        return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(result);
    });
};

  const getNotification = (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    connection.query('SELECT * FROM notification WHERE NotifiID = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching notification:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      res.status(200).json(result[0]);
    });
  };

  const addNotification = (req, res) => {
    const { Sender } = req.body
    const { MessageContent } = req.body
    if (!Sender || !MessageContent) {
      return res.status(400).json({ error: 'Sender and message content are required' });
    }
    connection.query('INSERT INTO notification (Sender, MessageContent) VALUES (?, ?)', [Sender,  MessageContent], (err) => {
      if (err) {
        console.error('Error adding notification:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'Notification added successfully' });
    });
  };

  const deleteNotification = (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'Notification ID is required' });
    }
    connection.query('DELETE FROM notification WHERE NotifiID = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting notification:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json({ message: 'Notification deleted successfully' });
    });
  };

  const updateNotification = (req, res) => {
    const { id } = req.params
    const { editedMessageContent } = req.body
    if (!editedMessageContent) {
      return res.status(400).json({ error: 'Edited message content are required' });
    }
    connection.query('UPDATE login_form SET editedMessageContent = ? WHERE NotifiID = ?', [editedMessageContent, id], (err, results) => {
      if (err) {
        console.error('Error updating notification:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification updated successfully' });
    });
  };
  
  
let showNotificationByID = async (req, res) => {
    const EmpID = req.params.EmpID;
    const NotiID = req.params.NotiID;

    const query = 
       `SELECT n.MessageContent, CONCAT(e.Fname, ' ', e.Lname) AS "Sender Name" 
        FROM notification n 
        INNER JOIN employee e ON n.Sender = e.EmpID 
        WHERE n.NotifiID = ?;`;

    connection.execute(query, [NotiID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to retrieve notification', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        const notification = result[0];
        res.status(200).json({ notification });
    });
};
  module.exports = { 
    getNotifications, 
    getNotification, 
    addNotification, 
    deleteNotification, 
    updateNotification,
    showNotificationByID
  };
  
  

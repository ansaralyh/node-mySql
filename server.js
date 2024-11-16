
import express from 'express'

const router = express.Router();
import db from '../SQL/db'


// Create a user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    onst [result] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.execute('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a single user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const [result] = await db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

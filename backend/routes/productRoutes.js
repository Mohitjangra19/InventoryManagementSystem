const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { name, quantity, price } = req.body;
  db.query('INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)',
    [name, quantity, price],
    (err) => {
      if (err) throw err;
      res.sendStatus(201);
    });
});

router.put('/:id', (req, res) => {
  const { name, quantity, price } = req.body;
  db.query('UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?',
    [name, quantity, price, req.params.id],
    (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;

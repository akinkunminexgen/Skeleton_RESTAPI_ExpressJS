const express = require('express')
const router = express.Router();

//connect database
const conn = require('../class/db')

// using a list just for example
let data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
];

const theTable = 'users';

//to get all entity data (table)
router.get('/', async (req, res) =>{
    try {
        await conn.query(`SELECT * FROM ${theTable}`,
             (err, result, fields) => {
            if (err) throw err;
            res.json(result);
          });
        
      } catch (error) {
        res.status(500).send(error.message);
      }
})


// POST Create a new data to an entity
router.post('/', async (req, res) => {
    var sql = `INSERT INTO ${theTable} (name, address) VALUES ('Company Inc', 'Highway 37')`;
  await conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted at "+ result.insertId);
  });
});


// GET a single user by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    var sql = `SELECT * FROM ${theTable} WHERE id = ?`
    await conn.query(sql,[id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(404).send('User not found');
          } else {
            res.json(result);
          }
      });
});


// PUT Update an existing user
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    var sql = `UPDATE ${theTable} SET name = ? WHERE id = ?`;
    await conn.query(sql, [name, id], (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});

// DELETE an existing user
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    var sql = `DELETE FROM ${theTable} WHERE id = ? RETURNING *`
    await conn.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(404).send('User not found');
          } else {
            res.status(201).json(result);
          }
      });
  });

module.exports = router;
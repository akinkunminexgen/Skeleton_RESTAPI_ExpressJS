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
        const result = await conn.query(`SELECT * FROM ${theTable}`,
             (err, result, fields) => {
            if (err) throw err;
            res.json(result);
          });
        
      } catch (error) {
        res.status(500).send(error.message);
      }
})


// POST Create a new data to an entity
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        name : name,
        email: email
    };
    data.push(newUser);
    res.status(201).json(newUser);
});


// GET a single user by ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = data.find(u => u.id === userId);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


// PUT Update an existing user
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
});
module.exports = router;
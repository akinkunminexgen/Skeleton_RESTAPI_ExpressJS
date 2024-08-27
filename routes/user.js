const express = require('express')
const router = express.Router();

const User = require('../models/user')


//initialize User
const theUser = new User('Users');



//to get all entity data (table)
router.get('/', async (req, res) =>{
    try {
         var result = await theUser.getAll();         
          res.json(result)
      } catch (error) {
        res.status(500).send(error.message);
      }
})


// POST Create a new data to an entity
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        var result = await theUser.createEntity(name);         
         res.json(result)
     } catch (error) {
       res.status(500).send(error.message);
     }
});


// GET a single user by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        var result = await theUser.getById(id); 
        if (result == '404')
            res.status(404).send('User not found');         
         res.json(result)
     } catch (error) {
       res.status(500).send(error.message);
     }
});


// PUT Update an existing user
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    try {
        var result = await theUser.updateEntity(id, name); 
        if (result == '404')
            res.status(404).send('User not found');        
         res.json(result)
     } catch (error) {
       res.status(500).send(error.message);
     }
    
});

// DELETE an existing user
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        var result = await theUser.deleteEntity(id); 
        if (result == '404')
            res.status(404).send('User not found');        
         res.json(result)
     } catch (error) {
       res.status(500).send(error.message);
     }
  });

module.exports = router;
const express = require('express')
const router = express.Router();

const AAuth = require('../middleware/authController');
const theAuth = new AAuth();

router.get('/', (req, res) =>{
    res.render('index');
})

router.get('/login', theAuth.authenticateToken, (req, res) =>{
    res.render('index');
})

router.post('/login', (req, res) =>{
    payload = req.body;
    const token = theAuth.generateAccessToken(payload);
    console.log("Generated token:", token);
    res.send(token);
})

router.delete('/logout', (req, res) =>{
    
    res.send('tologout');
})

module.exports = router;
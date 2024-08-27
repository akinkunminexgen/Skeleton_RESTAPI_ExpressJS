const jwt = require('jsonwebtoken')


class AAuth {
    constructor() {
        //nothing here
    }

    generateAccessToken = (payload) => {
        return jwt.sign(payload, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1m' })
      }


    addAuthorizationHeader = (token) => {
        return (req, res, next) => {
          // Attach the Authorization header to the request object
          req.headers['Authorization'] = `Bearer ${token}`;
          next(); // Proceed to the next middleware or route handler
        };
      };


      authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          console.log(err)
          if (err) return res.sendStatus(403)
          req.user = user
          next()
        })
      }
    
}

module.exports = AAuth;
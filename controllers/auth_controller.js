import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const authHeader = req.get('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({ "error": "Lacks Valid Authentication" })
  
    jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g932", (err, user) => {
  
        if (err) {
            return res.status(403).send({ "error": "Unauthorised Access" })
        }

      req.user = user
      
      
      next()
    })
  }

export default authenticateToken
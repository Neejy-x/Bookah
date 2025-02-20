module.exports = (req, res, next)=>{
  req.user.isAdmin ? next() : res.status(403).send('Access Denied. You are not an Admin')
}
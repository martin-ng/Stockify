const checkUser = (req, res, next) => {
  if (req.user) next()
  else res.sendStatus(503)
}

module.exports = {
  checkUser
}

const checkUser = (req, res, next) => {
  console.log('req', req.user)
  if (req.user.id === +req.params.id) {
    req.paramsId = +req.params.id
    next()
  } else res.sendStatus(503)
}

module.exports = {
  checkUser
}

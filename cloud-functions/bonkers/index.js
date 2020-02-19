exports.bonkersFunction = (req, res) => {
  const name =
    req.query && req.query.name
      ? req.query.name
      : req.body && req.body.name
      ? req.body.name
      : "World"
  res.send(`Hello! This is bonkers!`)
}

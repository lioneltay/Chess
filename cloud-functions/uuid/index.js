const uuid = require('uuid').v4

module.exports.uuid = (req, res) => {
  res.send(uuid())
}
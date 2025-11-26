const Log = require('../models/Log');

module.exports = async (req, res, next) => {
  if (req.user) {
    await Log.create({
      userId: req.user.id,
      action: req.method,
      endpoint: req.originalUrl
    });
  }
  next();
};

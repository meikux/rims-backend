const jwt = require('jsonwebtoken');

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Normalize roles to array
      const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

      if (roles.length > 0 && !roles.includes(decoded.role) && decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = auth;

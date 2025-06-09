function checkSession(req, res, next) {
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    return res.status(401).json({ message: "Session expired" });
  }
  next();
}

module.exports = checkSession;
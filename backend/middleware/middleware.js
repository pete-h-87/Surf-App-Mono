function checkSession(req, res, next) {
  console.log("the REQ pass port in checkSession:", req.session.passport);
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    return res.status(401).json({ message: "Session expired" });
  }
  next();
}

module.exports = checkSession;

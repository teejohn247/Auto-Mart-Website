
const admin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    res.status(403).json({ status: 403, error: 'Access denied!' });
  }
};

export default admin;

module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        message: "you are not authorized to access this!",
      });
    }
    next();
  };
};

const User = require("../models/User");

exports.createUserService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.getUserService = async () => {
  const users = await User.find({});
  return users;
};
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
exports.findUserByToken = async (token) => {
  return await User.findOne({ confirmationToken: token });
};

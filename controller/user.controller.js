const {
  createUserService,
  getUserService,
  findUserByEmail,
  findUserByToken,
} = require("../services/user.service");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { sendEmailWithMailGun, sendMailWithGmail } = require("../utils/email");
const { UserRefreshClient } = require("google-auth-library");

exports.getAllUser = async (req, res, next) => {
  try {
    const result = await getUserService();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await createUserService(req.body);

    const token = user.generateConfirmationToken();

    await user.save({ validateBeforeSave: false });

    const messageData = {
      to: [user.email],
      subject: "verify your account",
      text: `thank you, please verify here : ${req.protocol}://${req.get(
        "host"
      )}${req.originalUrl}/confirmation/${token}`,
    };

    sendMailWithGmail(messageData);

    res.status(200).json({
      status: "success",
      message: "successfully created user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "successfully logged in user",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await findUserByToken(token);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "invalid token",
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);
    if (expired) {
      return res.status(401).json({
        status: "fail",
        error: "token expired",
      });
    }
    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "successfully activated your account",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

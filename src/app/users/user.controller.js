import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import User from "./user.model.js";
import bcrypt from "bcryptjs";
class UserController {
  verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const sameUsername = await User.findOne({
      username: req.body.username,
    }).exec();
    if (sameUsername) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    const sameEmail = await User.findOne({
      email: req.body.email,
    }).exec();
    if (sameEmail) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  };
  signup = async (req, res) => {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 8),
    await user.save();
    delete user.password;
    res.jsonp(user)
  };
  signin = async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, 
    });

    res.jsonp({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  };
}
export default new UserController();

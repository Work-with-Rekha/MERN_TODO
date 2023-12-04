import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: "User already Exists!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Please SignUp!" });
    }

    const hashedPassword = user.password;
    const requestPassword = req.body.password;

    if (bcrypt.compareSync(requestPassword, hashedPassword)) {
      const access_token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "Successfully Logged In", access_token });
    } else {
      return res.status(404).json({ message: "Incorrect Passowrd" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};
export const logoutUser = async (req, res) => {};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// @desc SignIn authentication
// @route SIGNIN  /user/signin
//  @access Public
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If the user is not in the database
    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });

    // If the User exists in the database, comparing the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If the password is incorrect
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    // If the password is correct, generating a jsonwebtoken
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "1h" }
    );

    // Sending the response
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// @desc SignUp authentication
// @route SIGNUP /user/signup
//  @access Public
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If the user is not in the database
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // If the User exists in the database, comparing the password
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords don't match" });

    // If the passwords match with the database, hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating the user profile
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "secret", {
      expiresIn: "1h",
    });

    // Sending the response
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

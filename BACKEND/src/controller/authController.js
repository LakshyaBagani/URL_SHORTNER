import user from "../models/authModel";
import bcrypt from "bcrypt";
import generateJwtToken from "../utils/jwtToken.js";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(409).send({ success: false, message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    generateJwtToken(newUser._id, res);

    res
      .status(200)
      .send({ success: true, message: "User signup successfully!" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};



export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUsers = await user.findOne({ email });
    const isPasswordCorrrect = await bcrypt.compare(password, user.password);

    if (!existingUsers || !isPasswordCorrrect) {
      res.status(404).send({ success: false, message: "Invalid credientials" });
    }

    generateJwtToken(user._id, res);
    res
      .status(200)
      .send({ success: true, message: "User logged in successfully!" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


export const Logout = async (req,res)=>{
    try {
       res.clearCookie("jwt") 
       res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
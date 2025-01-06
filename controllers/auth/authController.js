const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../../db");
const { Oauth } = require("google-auth-library");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).json({ message: "Username, email or password are required" });

  const usernameExist = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
  if (usernameExist) return res.status(400).json({ message: "Username already exist" });

  const emailExist = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email}`;
  if (emailExist) return res.status(400).json({ message: "Email already exist" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (username && email && hashedPassword) {
      const user = await prisma.$executeRaw`INSERT INTO User (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;
    }
    if (user) return res.status(201).json({ message: "Account created" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Error creating account" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  const checkPassword = bcrypt.compare(password, hashedPassword);
  try {
    if (email !== "" && password !== "") {
      const user = await prisma.$queryRaw`SELECT * User WHERE email = ${email}`;
      if (!user) return res.status(404).json({ message: "User not found" });

      const checkPassword = bcrypt.compare(password, user.password);
      if (!checkPassword) return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: "1 day" });
      res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true }).status(200).json({ message: "Login success!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Login Failed" });
  }
};

const loginWithGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, username, email } = payload;

    let user = await prisma.$queryRaw`SELECT id, email, googleId FROM User WHERE googleId = ${googleId} LIMIT 1`;
    
    if(user){
      
    const sendToken = jwt.sign({ googleId: googleId }, process.env.TOKEN_SECRET, { expiresIn: "1 day" });

    res.cookie("token", sendToken, { httpOnly: true, sameSite: "None", secure: true }).status(200).json({ message: "Login with Google success!" });

    }else{
      return "You dont have a google account!"
    }

  } catch (err) {
    console.error("Google login error:", error);
    return res.status(401).json({ message: "Invalid Google Token" });
  }
};

module.exports = {
  register,
  login,
  loginWithGoogle,
};

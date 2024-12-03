import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const creds = [];

// Register a new user
export async function registerUser(req, res) {
  const { username, pwd } = req.body;

  if (!username || !pwd) {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  if (creds.find((c) => c.username === username)) {
    return res.status(409).send("Username already taken");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    const token = await generateAccessToken(username);

    creds.push({ username, hashedPassword });
    console.log("Token:", token);
    return res.status(201).send({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Internal server error.");
  }
}

// Generate an access token
function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

// Authenticate a user
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.log("JWT error:", error);
      return res.status(401).end();
    }
    req.user = decoded; // Optionally store the decoded token in the request
    next();
  });
}

// Log in a user
export async function loginUser(req, res) {
  const { username, pwd } = req.body;

  const retrievedUser = creds.find((c) => c.username === username);

  if (!retrievedUser) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);
    if (matched) {
      const token = await generateAccessToken(username);
      return res.status(200).send({ token });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal server error.");
  }
}
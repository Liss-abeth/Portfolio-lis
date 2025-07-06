const jwt = require('jsonwebtoken');

// Admin Login Controller
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Debug: Log inputs and env values
  console.log("Body:", req.body);
  console.log("From .env:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

  const adminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : "";
  const adminPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : "";

  const trimmedEmail = email.trim();
  const isEmailMatch = trimmedEmail === adminEmail;
  const isPasswordMatch = password === adminPassword;

  console.log("Comparing:", {
    enteredEmail: trimmedEmail,
    expectedEmail: adminEmail,
    emailMatch: isEmailMatch,
    enteredPassword: password,
    expectedPassword: adminPassword,
    passwordMatch: isPasswordMatch,
  });

  if (isEmailMatch && isPasswordMatch) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log("✅ Admin logged in successfully.");
    return res.status(200).json({ success: true, token });
  }

  console.log("❌ Invalid credentials");
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

// Protected route (example)
const protectedRoute = (req, res) => {
  res.json({ message: "You accessed a protected admin route!" });
};

module.exports = { loginAdmin, protectedRoute };

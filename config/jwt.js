const jwt =require("jsonwebtoken")
exports.generateToken = (user) => {
    const payload = {
      userId: user.id,
      email: user.email,
      type:user.type,
      name:user.fname
      // Add other claims as needed
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' }); // Adjust expiration time
    return token;
  };
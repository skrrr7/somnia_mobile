import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  console.log("Cookies received:", req.cookies); 
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;

const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/generateAccessToken");
const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;


const authenticateUser = (req, res, next) => {

  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(403);
  // console.log(req.user)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log(decoded)
    if (err && err.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decodedRefresh) => {
          if (err) return res.sendStatus(403);

          const newAccessToken = generateAccessToken(
            decodedRefresh.id,
            decodedRefresh.username
          );
          
          req.user = decodedRefresh.id;
          // console.log(decodedRefresh.id)
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: TOKEN_EXPIRY_TIME
          });
          
        }
      );
      next();
    } else if (err) {
      return res.sendStatus(403);
    } else {
      // console.log(decoded)
      req.user = decoded.id;
      next();
      
    }
  });
};

module.exports = authenticateUser;

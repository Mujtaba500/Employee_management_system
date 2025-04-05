import jwt from 'jsonwebtoken';

// this code will geberate access token for us
const generateAccessToken = (userObject) => {
  return jwt.sign(userObject, process.env.SECRET_KEY, { expiresIn: '120m' });
};

export default generateAccessToken;

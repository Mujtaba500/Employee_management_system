import jwt from 'jsonwebtoken';
// import client from '../../shared/redis/index.js';
import statusCodes from '../../shared/statusCodes.js';
export default async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(statusCodes.NOT_AUTHENTICATED)
      .json({ message: 'token is undefined' });
  }

  // checking the token is blacklist or not
  // const blackListtokens = await client.get(token);

  // if (blackListtokens === 'blackList') {
  //   return res
  //     .status(statusCodes.NOT_AUTHENTICATED)
  //     .json({ message: 'Unauthenticated.' });
  // }

  // verify our token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(statusCodes.NOT_AUTHENTICATED)
        .json({ message: 'Unauthenticated.' });
    }
    req.user = user; // sending data from middleware to another
    next();
  });
};

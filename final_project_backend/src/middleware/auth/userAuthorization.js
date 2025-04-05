import statusCodes from '../../shared/statusCodes.js';
export default (role) => {
  return async (req, res, next) => {
    const userObject = req.user;
    for (const item of role) {
      if (userObject.role === item) {
        return next(); // the next() does not call immediatly so we have to write return with it other loop works and return res
      }
    }

    return res
      .status(statusCodes.NOT_AUTHENTICATED)
      .json({ message: 'you are unauthorized to perform this task' });
  };
};

import jwt from 'jsonwebtoken';

const { verify } = jwt;

export const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({error: 'Invalid Token'})
  }
  try {
    const validated = verify(token, process.env.JWT_SECRET);
    if (validated) {
       req.tokenData = validated;
      return next();
    }
    return res.status(401).json({error: 'Invalid Token'})
  } catch (err) {
    console.error(err);
    return res.status(401).json({error: 'Invalid Token'});
  }
}

const auth = {tokenValidation};

export default auth;
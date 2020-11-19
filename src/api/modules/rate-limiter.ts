import rateLimit from 'express-rate-limit';
import RateLimitStore from 'rate-limit-mongo';
import config from '../../../config.json';

export default rateLimit({
  max: 300,
  message: JSON.stringify({ code: 429, message: 'You are being rate limited.' }),
  store: new RateLimitStore({ uri: config.mongoURI }),
  windowMs: 60 * 1000
});

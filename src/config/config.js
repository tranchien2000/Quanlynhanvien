import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve(path.dirname(''));

dotenv.config({ path: path.join(__dirname, '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: `mongodb://${process.env.MONGODB_URI || 'localhost'}/${
      process.env.MONGODB_NAME || 'job-seeking'
    }`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  secret: process.env.SECRET
};

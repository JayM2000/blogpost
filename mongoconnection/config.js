
import dotenv from "dotenv";   
dotenv.config();

const val = {
  uris: process.env.MONGODB_URI
};

export default val;
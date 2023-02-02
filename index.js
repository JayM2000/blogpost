
import express from "express";
import bodypar from "body-parser";     // to proccess body request 
// import mong from "mongoose";          //  database
import cors from "cors";              // cors(Cross-origin resource sharing) ->  cross origin request
// import dotenv from "dotenv";          // for environment variables
// dotenv.config();

import multer from "multer";          // file upload locally
import helmet from "helmet";          // request safety
import morgan from "morgan";          // for login purpose

import objs from "./mongoconnection/mongos.js";
objs();
// console.log(obj.name);

import path from "path";
import { fileURLToPath } from "url";

import rout from "./routes/route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodypar.json({limit:"30mb", extended:true}));
app.use(bodypar.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));

// routes files
app.use('/rout',rout);

app.get("/",(req,res)=>{
    res.json("server started...")
})

// file storage
const stor = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file,cb){
        cb(null, file.originalname)
    },
});

const upload = multer({ stor });


// server listening....
const port = process.env.PORT || 5000;

app.listen(port,(req,res) => {
    console.log('server listening.... ');
});
// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";

const verifytk = (req, res, next) => {

    // const heads = req.headers['authorization'].split(" ")[1];
    console.log(`env file variables -> ${process.env.SIGNT}`);

    const heads = req.headers['authorization'];
    console.log(`from bakend token -> ${heads}`);

    jwt.verify(String(heads), 'shubh', (err, data) => {
        if (err) {
            res.json({mess:err,st:404});
        }
        else {
            req.id = data.id;
            req.tk = heads;
            next();
        }
    });
};

export default verifytk;
import express from "express";
const rout = express.Router();

import Users from "../models/usersdet.js";   // Users Database

import jwt from "jsonwebtoken";
import verifyfl from "../verifytk/vertkfl.js";

rout.post('/login',async (req,res) => {
    const {em,pword} = req.body;

    try {
        const userdets =await Users.logindet(em,pword);
        const userid = userdets._doc._id;

        console.log(`user id ${userid}`);

        const token = jwt.sign({id: String(userid)},'shubh',{
            expiresIn:'20s'
        });

        res.json({st:200,mess:token});

    } catch (err) {
        console.log(`errors ${err}`);
        res.json({st:404,mess:err});
    }
});

rout.post('/reg',async (req,res) => {

    const {fname,em,pword} = req.body;
    console.log(`from backend file register ${fname}`);

    try {
        let usereg = await Users.findOne({em:em});
        if(usereg){
            throw 'Email already exist !!!';
        }

        const newuser = new Users({fname:fname,em:em,pword:pword});
        const newval = await newuser.save();

        res.json({st:200,mess:`Account created ${newval.fname} `});
        
    } catch (err) {
        res.json({st:404,mess:err});
    }

});

const authoo = async (req, res) => {
    const userid = req.id;

    try {
        const user = await Users.findById({ _id: userid }).select('-pword');

        if (!user) {
            return res.json({ st:404,mess:'User not found !! Not authorized' });
        }

        res.json({st:200,mess:user});
    } catch (err) {
        res.json({ st:404,mess: err });
    }
};

rout.get('/autho',verifyfl,authoo);

rout.get('/dash',verifyfl,async (req,res) => {
    res.json({st:200,mess:'welcome users'});

});

export default rout;
import mongo from "mongoose";

const usersch = new mongo.Schema({
    fname:{
        type:String,
        require:true,
        min:2,
        max:50
    },
    lname:{
        type:String,
        require:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:5
    },
    picpath:{
        type:String,
        default:""
    },
    frnd:{
        type:Array,
        default:[]
    },
    location:String,
    occupation: String,
    viewedprof: Number,
    impr: Number 
});

const users = mongo.model("usersdb",usersch);
export default users;
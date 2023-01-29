import mongo from "mongoose";
import crypt from "bcrypt";

const users = new mongo.Schema({
    fname:{
        type:String,
        require:false,
        min:2,
        max:50
    },
    em:{
        type:String,
        require:true,
        max:50,
        unique:true
    },
    pword:{
        type:String,
        require:true,
        min:5
    },
});

users.statics.logindet = async function(em,pass) {
    const users =await user.findOne({em:em});

    if(!users){
      throw  'Email invalid not matched !!!!';
    }

    const userpass = await crypt.compare(pass,users.pword); 
    if(!userpass){
      throw  'Invalid credientials.... passowrd invalid  #%';
    }

    return users;
};

users.pre('save',async function(next){
  const user = this;
  if(user.isModified('pword')){
    user.pword = await crypt.hash(user.pword,8);
  }

  next();
});

const user = mongo.model("refusers",users);
export default user;
import mon from "mongoose";
import obj from "./config.js";
const conn = obj.uris;

const val = async () => {
    await mon.connect(conn)
        .then(x => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`,
            );
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });
    return mon;
};


export default val;
// module.exports = val;          //this is not accepted in type module 
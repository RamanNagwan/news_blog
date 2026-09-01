import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((connection) => {
            console.log(`database connected ${connection}`);
        }).catch((err) => {
            console.log(`connection error : ${err}`);
        })
}

export default dbConnection;
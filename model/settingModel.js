import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    footer: {
        type: String,
        required: true
    }
})

const Setting = mongoose.model("Setting", schema);

export default Setting;
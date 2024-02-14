import mongoose from "mongoose";

const Auth_shema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        defautl: "user"
    }
},
    {
        timestamps: true
    })
mongoose.models = {};
export default mongoose.model("auth", Auth_shema);
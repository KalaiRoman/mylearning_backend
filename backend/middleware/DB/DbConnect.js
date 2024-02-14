import mongoose from 'mongoose';
const ConnectDataBase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
    }
}
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Close Mongoose Db");
        process.exit(0);
    }
    )
})
export default ConnectDataBase;
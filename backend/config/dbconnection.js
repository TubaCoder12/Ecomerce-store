import mongoose from "mongoose";

const dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => console.log(`db is Connect ${conn.connection.host}`))
    .catch((err) => console.error(`db is disconnected ${err.message}`));
};
export default dbconnection;

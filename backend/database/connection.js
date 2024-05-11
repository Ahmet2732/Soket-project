import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/BlogAssignemnt")
    .then(() => {
      console.log("DB Connected Succesfully");
    })
    .catch((err) => {
      console.log("DB Failed to connect",err);
    });
};

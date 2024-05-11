import { Schema,model } from "mongoose";

const noteSchema = new Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

const noteModel = model("note", noteSchema);

export default noteModel;

import mongoose from "mongoose";

const memeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Meme", memeSchema);
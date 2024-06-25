import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

export default Advertisement;

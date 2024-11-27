import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});
const School = mongoose.model('School', schoolSchema);

export default School;
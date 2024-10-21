import mongoose from "mongoose";

const titleSchema = new mongoose.Schema({
    title: { type: String, required: true }
});

const Title = mongoose.models.Title || mongoose.model('Title', titleSchema);

export default Title;

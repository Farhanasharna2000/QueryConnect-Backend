const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    askedBy: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    isAnswered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;

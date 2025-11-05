import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [{ type: String }],
    notes: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;

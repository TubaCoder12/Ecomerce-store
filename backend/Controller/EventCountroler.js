
import Event from "../Model/EventModel.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

// ✅ Fetch events
export const fetchEvents = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ error: "Unauthorized, no user found" });
    }

    const events = await Event.find({ user: req.user._id });
    res.json({
      events,
      total: events.length,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Something went wrong fetching events" });
  }
};

// ✅ Add Event with Cloudinary upload
import fs from 'fs';
import Event from '../models/Event.js';
import cloudinary from '../config/cloudinary.js'; // tumhara already export kiya hua

export const addEvent = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, activities, notes } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "events",
          resource_type: "image", // ensure correct type
        });
        images.push(result.secure_url);

        // delete temp file
        fs.unlinkSync(file.path);
      }
    }

    const event = new Event({
      user: req.user._id,
      title,
      destination,
      startDate,
      endDate,
      activities: activities ? JSON.parse(activities) : [],
      notes,
      images,
    });

    await event.save();

    res.json({
      event,
      message: "Event added successfully",
    });
  } catch (error) {
    console.error("Cloudinary / Add Event Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};


// ✅ Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user._id });
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update event with Cloudinary image upload
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user._id });
    if (!event) return res.status(404).json({ error: "Event not found" });

    const fields = ["title", "destination", "startDate", "endDate", "activities", "notes"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = field === "activities" ? JSON.parse(req.body[field]) : req.body[field];
      }
    });

    // ✅ New image upload to Cloudinary
    if (req.files && req.files.length > 0) {
      let newImages = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "events" });
        newImages.push(result.secure_url);

        fs.unlinkSync(file.path); // delete temp
      }
      event.images = newImages;
    }

    await event.save();

    res.json({
      event,
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

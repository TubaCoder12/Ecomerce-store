import express from "express";
const EventRoutes = express.Router();
import * as event from "../Controller/EventCountroler.js";
import { upload } from "../Middleware/Multer.js";
import { Authenticated } from "../Middleware/Auth.js";

// Add a new event with optional images
EventRoutes.post("/add-event", Authenticated, upload.array("images", 5), event.addEvent);

// Get all events for logged-in user
EventRoutes.get("/fetch", Authenticated, event.fetchEvents);

// Get single event by ID
EventRoutes.get("/:id", Authenticated, event.getEventById);

// Update an event by ID (with image upload support)
EventRoutes.put("/:id", Authenticated, upload.array("images", 5), event.updateEvent);

// Delete an event by ID
EventRoutes.delete("/delete/:id", Authenticated, event.deleteEvent);

export default EventRoutes;

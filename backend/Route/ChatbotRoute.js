import express from "express";
import { getChatbotResponse } from "../Controller/ChatbotController.js";

const ChatbotRouter = express.Router();

// POST /api/chatbot
ChatbotRouter.post("/", getChatbotResponse);

export default ChatbotRouter;

// Vercel serverless function entry point
import dotenv from "dotenv";
import express from "express";
import { registerRoutes } from "../server/routes.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
await registerRoutes(app);

export default app;
import express from "express";
import cors from "cors";
import offerRoutes from "./routes/offer.routes.js";
import leadRoutes from "./routes/lead.routes.js";

const app = express();
app.use(cors({})); // Allowing all the origins

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/offer", offerRoutes);
app.use("/api/v1/leads", leadRoutes);

export default app;

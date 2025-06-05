import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./src/config/mongoConfig.js";
import urlRoute from "./src/routes/urlRoute.js";
import authRoute from "./src/routes/authRoute.js";
import qrRoute from "./src/routes/qrRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://url-shortner-ghun.vercel.app/",
    credentials: true,
  })
);

dotenv.config();
connectToDB();


app.use("/url", urlRoute);
app.use("/auth", authRoute);
app.use("/generateQR", qrRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

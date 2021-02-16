import express from "express";
import dotenv from "dotenv";
import DBconnection from "./DBconnection.js";
import Memes from "./routes/memeRoute.js";
import path from "path";
import cors from 'cors';
const app = express();
dotenv.config();
DBconnection();
app.use(express.json());
app.use(cors())
app.use("/memes", Memes);
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")),
  );
} else {
  
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
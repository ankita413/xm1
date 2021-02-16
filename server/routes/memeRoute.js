import express from "express";
import memeSchema from "../model/memeSchema.js";
const router = express.Router();
import mongoose from "mongoose";
mongoose.set("useFindAndModify", false);

router.get("/", (req, res) => {
  memeSchema.find()
    .limit(100)
    .sort("-createdAt")
    .then((memes) => {
      res.status(200).json( {memes} );
    })
    .catch((err) => res.status(422).json({ error: "Error in finding Memes" }));
});

router.get("/:id", (req, res) => {
  memeSchema.findById(req.params.id)
    .then((meme) => res.status(201).json({ meme }))
    .catch((err) => res.status(422).json({ error: "Meme Not Found" }));
});

router.put("/:id", (req, res) => {
  const { url, caption } = req.body;
  const { id } = req.params;

  memeSchema.findByIdAndUpdate(
    id,
    { $set: { caption: caption, url: url } },
    { new: true },
  )
    .then((meme) => res.status(202).json({ message: "Meme updated" }))
    .catch((err) => res.status(422).json({ error: "Failed to Update" }));
});

router.post("/", (req, res) => {
  const { name, caption, url } = req.body;

  memeSchema.findOne({
    $or: [{ name: name }, { caption: caption }, { url: url }],
  }).then((meme) => {
    if (meme) {
      res
        .status(409)
        .json({ error: "Data with same Name/caption/url already exits" });
    } else {
      const create = memeSchema.create({
        name,
        caption,
        url,
      });
        
      if (create) {
       create.save(function(err,create)
       {
         if(err) return console.error(err)
       });
       res.status(200).json({"_id":create._id})
      } else {
        res.status(422).json({ error: "Error Occoured!" });
      }
    }
  });
});


router.delete("/:id", (req, res) => {
  memeSchema.findByIdAndDelete(req.params.id)
    .then((meme) => res.status(202).json({ message: "Deleted Successfully" }))
    .catch((err) => res.status(422).json({ error: "Failed to Delete" }));
});

export default router;
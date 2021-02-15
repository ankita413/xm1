import React, { useEffect, useState } from "react";

import HandleForm from "./HandleForm";
import Navbar from "../Navbar/Navbar";
import "./Form.css";
import Memes from "../Memes/Memes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
const FormDiv = () => {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    getMemes();
  }, []);

 
  function getMemes() {
    fetch("/memes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.memes);
        const d = new Date(res.memes.length > 0 && res.memes[0].createdAt);
        console.log(d.toLocaleString());
        setMemes(res.memes);
      });
  }

  return (
    <div>
      {/* <h1 className="heading">Meme Stream</h1> */}
      <Navbar />
      <HandleForm getMemes={getMemes} />
      <Memes memes={memes} />
    </div>
  );
};

export default FormDiv;
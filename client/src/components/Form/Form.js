import React, { useEffect, useState } from "react";

import HandleForm from "./HandleForm";
import Navbar from "../Navbar/Navbar";
import "./Form.css";
import Memes from "../Memes/Memes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
const Form = () => {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    getMemes();
  }, []);

 
  function getMemes() {
    fetch("http://xmemebackendserver.herokuapp.com/memes")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.memes);
        
        setMemes(response.memes);
      });
  }

  return (
    <div>
      <Navbar />
      <HandleForm getMemes={getMemes} />
      <Memes memes={memes} />
    </div>
  );
};

export default Form;
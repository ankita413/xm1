import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import './HandleForm.css'
const HandleForm = ({ getMemes }) => {

  const [memeURL, setMemeURL] = useState("");
  const [memeCreator, setMemeCreator] = useState("");
  const [caption, setCaption] = useState("");
  const [validate, setValidate] = useState(0);

  function validateInput() {
    if (memeCreator.length === 0 || caption.length === 0 || memeURL.length === 0) {
      setValidate(1);
      return false;
    } else {

      setValidate(0);
      return true;
    }
  }

  
  const postMeme = () => {
    if (validateInput()) {
      fetch("http://localhost:8081/memes", {
        
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: memeCreator,
          caption: caption,
          url: memeURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
          toast.error(data.error);
          } else {
            toast.success(data.message);
            getMemes();
            setMemeCreator("");
            setCaption("");
            setMemeURL("");
            setValidate(0);
          }
        });
    }
  };

  return (
    <Form className="form">
      <Form.Group controlId="memeCreator">
        <Form.Label>Name</Form.Label>
        <Form.Control className = "NameInput"
          type="text"
          placeholder="Name"
          value={memeCreator}
          onChange={(event) => setMemeCreator(event.target.value)}
        />
        <Form.Text className="text-muted">
          {validate && memeCreator.length === 0 ? (
            <p style={{ color: "red" }}>Memer Name</p>
          ) : null}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="Caption">
        <Form.Label>Caption</Form.Label>
        <Form.Control  className = "CaptionInput"
          value={caption}
          placeholder="Caption"
          type="text"
          onChange={(event) => setCaption(event.target.value)}
        />
        <Form.Text className="text-muted">
          {validate && caption.length === 0 ? (
            <p style={{ color: "red" }}>Enter Caption</p>
          ) : null}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="URL">
        
        <div className="memeUrl">
        <Form.Label>URL</Form.Label>
          <Form.Control  className = "urlInput"
            value={memeURL}
            
            type="text"
            placeholder="Enter Meme Url"
            onChange={(e) => {
              setMemeURL(e.target.value);
              
            }}
          />
          </div>
          <Button variant="primary" onClick={postMeme} className="submit">
            Submit 
          </Button>
        
        <Form.Text className="text-muted">
          {validate && memeURL.length === 0 ? (
            <p style={{ color: "Red" }}>Enter URL</p>
          ) : null}
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default HandleForm;
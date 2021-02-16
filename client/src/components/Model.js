import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const MODEL_STYLE = {
 
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "white",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};
const Modal = ({ open, onClose, id, caption, url, name, fetchMemes }) => {
  var [creator, setCreator] = useState("");
  var [caption, setCaption] = useState("");
  var [memeURL, setMemeURL] = useState("");
  const [validate, setValidate] = useState(0);
  const [invalidUrl, setInvalid] = useState(false);
  useEffect(() => {
    setCreator(name);
    setCaption(caption);
    setMemeURL(url);
  }, [name, url, caption]);

 
  function validateURL() {
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    if (memeURL.match(regex)) {
      setValidate(0);
      return true;
    } else {
      console.log("false");
      setValidate(1);
      return false;
    }
  }

  
  const Update = () => {
    if (checkInput() && validateURL()) {
      fetch(`/memes/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: caption,
          url: memeURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            // alert("yes");
          } else {
            fetchMemes();
            toast.success(data.message);
            onClose();
            //
          }
        });
    }
  };
  function checkInput() {
    if (creator.length === 0 || caption.length === 0 || memeURL.length === 0) {
      setValidate(1);
      setInvalid(false);
      return false;
    } else {
      setValidate(0);
      setInvalid(true);
      return true;
    }
  }
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODEL_STYLE}>
        <Form className="form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={creator || ""}
              placeholder="Name"
              onChange={(e) => setCreator(e.target.value)}
              disabled
            />
            <Form.Text className="text-muted">
              {validate && creator.length === 0 ? (
                <p style={{ color: "red" }}>Name</p>
              ) : null}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              value={caption || ""}
              type="text"
              placeholder="caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <Form.Text className="text-muted">
              {validate && caption.length === 0 ? (
                <p style={{ color: "red" }}>Caption</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <div className="inline">
              <Form.Control
                value={memeURL || ""}
                type="text"
                placeholder="URL"
                onChange={(e) => setMemeURL(e.target.value)}
              />
            </div>
            <Form.Text className="text-muted">
              {invalidUrl && validate && memeURL.length === 0 ? (
                <p style={{ color: "Red" }}>Invalid URL</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <div>
              <Button
                variant="primary"
                className="submit"
                onClick={Update}
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={onClose}
                style={{ margin: "0 0 0 2px" }}
              >
                Cancel
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default Modal;
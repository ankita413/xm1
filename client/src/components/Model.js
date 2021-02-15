import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const MODEL_STYLE = {
  //   height: "50",
  //   width: "500px",
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
  var [owner, setOwner] = useState("");
  var [captionn, setCaption] = useState("");
  var [imageURL, setImageURL] = useState("");
  const [check, setCheck] = useState(0);
  const [invalidUrl, setInvalid] = useState(false);

  // use to set values in model with values of meme that we wish to edit
  useEffect(() => {
    setOwner(name);
    setCaption(caption);
    setImageURL(url);
  }, [name, url, caption]);

  // check url
  function checkURL() {
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    if (imageURL.match(regex)) {
      setCheck(0);
      return true;
    } else {
      console.log("false");
      setCheck(1);
      return false;
    }
  }

  // request to edit meme after all checks
  const editMeme = () => {
    if (checkFields() && checkURL()) {
      fetch(`/memes/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: captionn,
          url: imageURL,
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

  // will check if all fields are right
  function checkFields() {
    if (owner.length === 0 || captionn.length === 0 || imageURL.length === 0) {
      setCheck(1);
      setInvalid(false);
      return false;
    } else {
      setCheck(0);
      setInvalid(true);
      return true;
    }
  }

  // if model is not opened then return null else show modal
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODEL_STYLE}>
        <Form className="form">
          <Form.Group controlId="name">
            <Form.Label>Meme Owner</Form.Label>
            <Form.Control
              type="text"
              value={owner || ""}
              placeholder="Enter your full name"
              onChange={(e) => setOwner(e.target.value)}
              disabled
            />
            <Form.Text className="text-muted">
              {check && owner.length === 0 ? (
                <p style={{ color: "red" }}>Enter Meme Owner</p>
              ) : null}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              value={captionn || ""}
              type="text"
              placeholder="Be Creative with the caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <Form.Text className="text-muted">
              {check && captionn.length === 0 ? (
                <p style={{ color: "red" }}>Enter Caption</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>Meme URL</Form.Label>
            <div className="inline">
              <Form.Control
                value={imageURL || ""}
                type="text"
                placeholder="Enter URL of your meme here"
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            <Form.Text className="text-muted">
              {invalidUrl && check && imageURL.length === 0 ? (
                <p style={{ color: "Red" }}>Invalid URL</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <div>
              <Button
                variant="primary"
                className="submitMeme"
                onClick={editMeme}
              >
                Edit Meme
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
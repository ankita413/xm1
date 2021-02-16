import React, { useEffect, useState } from "react";
import "./Memes.css";
import Modal from "../Model";
import { Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const Memes = ({ memes: meme }) => {
  const [name, setName] = useState();
  const [caption, setCaption] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState();
  const [memes, setMemes] = useState();
  const [isOpen, setIsOpen] = useState(false);
 
 useEffect(() => {
    window.scrollTo(0, 0);
    setMemes(meme);
  }, [meme]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMemes(memes);
  }, [memes]);

  // fetch memes
  function getMemes() {
    fetch("/memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.memes);
      });
  }

  const deleteMeme = (id) => {
    fetch(`/memes/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          
        } else {
         
          toast.success(data.message);

          
        }
      });
  };
 
  const Edit = (id, caption, url, name) => {
    setIsOpen(true);

    setId(id);
    setCaption(caption);
    setUrl(url);
    setName(name);
  };

  return (
    <div className="entireMeme">
      {!memes && <p>Memes Loading....</p>}
      {memes && memes.length > 0 ? (
        memes.map((meme) => (
          <div
            className="meme"
            key={meme._id}     
          >
            <div className="memeInfo">
              <div className="data">
                <h4>{meme.name}</h4>
              </div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      Edit(meme._id, meme.caption, meme.url, meme.name)
                    }
                  >
                    Edit
                  </Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="caption">{meme.caption}</p>
            <img height = "175px" width = "200px"  className ="memeImage"
              src={meme.url}
              onError={(event) => {
                event.target.src =
                  "https://cdn.dribbble.com/users/1100163/screenshots/10895523/no_results_found_4x.jpg";
              }}
              alt={"meme"}
            />
            <div className = "Buttons">
              <Button className = "Update" onClick={() => Edit(meme._id, meme.caption, meme.url, meme.name)}>Update</Button>
              <Button className = "delete" onClick={() => deleteMeme(meme._id)}>Delete</Button>
          </div>
       </div>
        ))
      ) : (
        <div className="noMeme">
          <p>No Memes Found</p>
        </div>
      )}
    
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        id={id}
        caption={caption}
        url={url}
        name={name}
        getMemes={getMemes}
      >
        Fancy Modal
      </Modal>
    </div>
  );
};

export default Memes;
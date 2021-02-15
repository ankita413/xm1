import React, { useEffect, useState } from "react";
import "./Memes.css";
import Modal from "../Model";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const Memes = ({ memes: m }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [caption, setCaption] = useState();
  const [url, setUrl] = useState();
  const [name, setName] = useState();
  const [memes, setMemes] = useState();

  // will set fetched memes and will make scroller to top in case list got added with new meme
  useEffect(() => {
    window.scrollTo(0, 0);
    setMemes(m);
  }, [m]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMemes(memes);
  }, [memes]);

  // fetch memes
  function fetchMemes() {
    fetch("/memes")
      .then((res) => res.json())
      .then((res) => {
        setMemes(res.memes);
      });
  }

  // just to see id of card when clicked
  const getIdFromMeme = (id) => {
    console.log(id);
  };

  // for fields of form when we wish to edit
  const handleEdit = (id, caption, url, name) => {
    setIsOpen(true);

    setId(id);
    setCaption(caption);
    setUrl(url);
    setName(name);
  };

  // delete meme
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
          // alert("yes");
        } else {
          fetchMemes();
          toast.success(data.message);

          //
        }
      });
  };

  return (
    <div className="meme">
      {!memes && <p>Loading</p>}
      {memes && memes.length > 0 ? (
        memes.map((meme) => (
          <div
            className="card"
            key={meme._id}
            onClick={() => getIdFromMeme(meme._id)}
          >
            <div className="info">
              <div className="data">
                <h5>{meme.name}</h5>
                {
                  <span className="time">
                    {new Date(meme.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                }
              </div>

              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleEdit(meme._id, meme.caption, meme.url, meme.name)
                    }
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteMeme(meme._id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="caption">{meme.caption}</p>
            <img
              src={meme.url}
              onError={(e) => {
                // change image url if given url is a broken image
                e.target.src =
                  "https://cdn.dribbble.com/users/1100163/screenshots/10895523/no_results_found_4x.jpg";
              }}
              alt={"meme"}
            />
          </div>
        ))
      ) : (
        <div className="noMeme">
          <p>No Memes Found</p>
        </div>
      )}
      {/* modal that opens when we wish to edit meme */}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        id={id}
        caption={caption}
        url={url}
        name={name}
        fetchMemes={fetchMemes}
      >
        Fancy Modal
      </Modal>
    </div>
  );
};

export default Memes;
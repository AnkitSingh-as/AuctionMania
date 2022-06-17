import React, { useState } from "react";
import {Form} from 'react-bootstrap';

const EditItem = (props) => {
  const [item, setItem] = useState({
    title: props.title,
    img: props.img,
    id: props.id,
  });

  //   console.log(item);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };
  //   console.log(item);
  const editUserItem = () => {
    // let data = {
    //   title: item.title,
    //   img: item.img,
    // };
    fetch("/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="editModalLabel">
              Edit Item
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <h3>Edit Item</h3>
            <div className="form-group">
              <form onSubmit={editUserItem}>
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  name="title"
                  placeholder="Item Name"
                  onChange={changeHandler}
                  
                />

<div className="mt-2">
                  <label htmlFor="img">Image URL</label>
                  <input
                    className="form-control"
                    name="img"
                    placeholder=""
                    onChange={changeHandler}
                   
                  />
                  <label htmlFor="price">Starting Price</label>
                  <input className="form-control" name="price" placeholder=""
                  onChange={changeHandler}

                  />
                {/* <Stack component="form" noValidate spacing={3}>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack> */}

                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dos" placeholder="Date of Selling" onChange={changeHandler} />
                        </Form.Group>
                  {/* <textarea
                    className="form-control"
                    name="desc"
                    placeholder="Description"
                    rows="3"
                    onChange={changeHandler}
                    value={item.desc || ""}
                  /> */}
                  <button className="btn btn-primary mt-4">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

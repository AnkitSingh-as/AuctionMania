import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import BootstrapDatePickerComponent from "./DatePicker";
import {Form} from 'react-bootstrap'

// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';

const AddItem = (props) => {
  const [item, setItem] = useState("");

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
        dos: value
      };
    });
  };

  const addUserItem = () => {
    const newKey = uuid();

    let data = {
      key: newKey,
      id: newKey,
      title: item.title,
      bids: 0,
      price: item.price, //change to store in cents?
      dos : item.dos,
      highBidder: "",
      highBidderId: "",
      seller: props.loggedIn.username,
      sellerId: props.loggedIn.id,
      img: item.img,
    };

    console.log("client: ", data);



    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
      id="addModal"
      tabIndex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="addModalLabel">
              Add Item To The Auction
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <form onSubmit={addUserItem}>
                <label htmlFor="title">Item Title</label>
                <input
                  className="form-control"
                  name="title"
                  placeholder=""
                  onChange={changeHandler}
                  value={item.title || ""}
                />

                <div className="mt-2">
                  <label htmlFor="img">Image URL</label>
                  <input
                    className="form-control"
                    name="img"
                    placeholder=""
                    onChange={changeHandler}
                    value={item.img || ""}
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
                  <button className="btn btn-primary mt-4">Add Item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

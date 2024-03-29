import React, { useState } from "react";
import MySideNav from "../Components/Sidenav";
import Topnav from "../Components/Topnav";
import { useDispatch, useSelector } from "react-redux";
import { handleEditProfile, handleGetProfile } from "../Redux/Actions/Profile";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Spinner from "../Components/Spinner";

export default function Profile() {
  const dispatch = useDispatch();
  const { data, loading, success, error } = useSelector(
    ({ Profile }) => Profile
  );
  console.log(data, "usedata");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Profile();
  }, []);

  useEffect(() => {
    if (success) {
      setOpen(true);
      setMessage("uploaded successfully");
    } else if (success == false) {
      setOpen(true);

      setMessage("something went wrong");
    } else return;
  }, [success]);

  const [profileDetails, setProfileDetails] = useState({});

  const Profile = () => {
    dispatch(handleGetProfile());
  };

  const setProfile = () => {
    setProfileDetails({
      image: data?.profile_image_url,
      username: data?.username,
      first_name: data?.first_name,
      last_name: data?.last_name,
    });
  };

  useEffect(() => {
    setProfile();
  }, [data]);

  const form = new FormData();
  const handleProfile = (e) => {
    e.preventDefault();
    form.append("username", profileDetails.username);
    form.append("first_name", profileDetails.first_name);
    form.append("last_name", profileDetails.last_name);
    console.log(form, "form");
    dispatch(handleEditProfile(form));
  };
  const submitImage = (e) => {
    e.preventDefault();
    form.append("image", image);
    dispatch(handleEditProfile(form));
  };

  console.log(form, "form");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
    console.log(name, value);
  };
  const [image, setImage] = useState({});

  return (
    <>
      <MySideNav />
      <Topnav />
      <div className="t-container">
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Collapse in={open}>
            <Alert
              severity={success ? "success" : "error"}
              // color="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
        </Box>
        <div className="prof-body">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="prof-form">
                <div className="prof-form-head">
                  <b>Update account information</b>
                </div>
                <form onSubmit={handleProfile}>
                  <div className="pro-form-line">
                    <div className="pro-text">
                      <span>Username:</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={handleChange}
                        defaultValue={data?.username}
                      />
                      <label style={{ fontSize: "small", color: "#fdb44b" }}>
                        please log out and sign in after username is edited
                      </label>
                    </div>
                  </div>
                  <div className="pro-form-line">
                    <div className="pro-text">
                      <span>First Name:</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="John Doe"
                        onChange={handleChange}
                        defaultValue={data?.first_name}
                      />
                    </div>
                  </div>

                  <div className="pro-form-line">
                    <div className="pro-text">
                      <span>Last Name:</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="last name"
                        name="last_name"
                        onChange={handleChange}
                        defaultValue={data?.last_name}
                      />
                    </div>
                  </div>

                  <div className="prof-form-button">
                    <button type="submit">Update</button>
                  </div>
                </form>
              </div>
              <div className="prof-upload">
                <div className="prof-photo">
                  <b>Change account photo</b>

                  <div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select photo
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="image"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        console.log(e.target.name, e.target.files[0]);
                      }}
                    />
                  </div>
                  <p>Accepted formats:png,jpg</p>
                  <div className="prof-photo-button">
                    <button onClick={submitImage}>Upload</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="push"></div>
    </>
  );
}

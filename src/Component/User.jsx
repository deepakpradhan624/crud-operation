import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Input,
} from "@mui/material";
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  GetSeachResult,
  GetUserbycode,
  UpdateUser,
} from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import axios from "axios";

const User = (props) => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "job_title", name: "Job Title" },
    { id: "user_role", name: "User Role" },
    { id: "email", name: "Email" },
    { id: "profile_photo", name: "Profile Pic" },
    { id: "action", name: "Actions" },
  ];

  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("Create user");

  const editobj = useSelector((state) => state.user.userobj);

  useEffect(() => {
    if (Object.keys(editobj).length > 0) {
      setId(editobj.id);
      setName(editobj.name);
      setEmail(editobj.email);
      setJobTitle(editobj.jobTitle);
      setUserRole(editobj.userRole);
      setPassword(editobj.password);
      setProfilePhoto(editobj.profilePhoto);
    } else {
      clearstate();
    }
  }, [editobj]);

  useEffect(() => {
    if (searchQ == "") dispatch(GetAllUsers());
  }, [searchQ]);

  const functionadd = () => {
    setEdit(false);
    setTitle("Create User");
    openpopup();
  };
  const closepopup = () => {
    setOpen(false);
  };
  const openpopup = () => {
    setOpen(true);
    clearstate();
    dispatch(OpenPopup());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _obj = {
      id,
      name,
      jobTitle,
      userRole,
      email,
      password,
      confirmPass,
      profilePhoto,
    };

    if (edit) {
      dispatch(UpdateUser(_obj));
    } else {
      if (password !== confirmPass) {
        console.log("Password Doesn't match");
      } else dispatch(CreateUser(_obj));
    }
    closepopup();
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    if (name == "password") setPassword(value);
    else setConfirmPass(value);
  };

  const handleEdit = (code) => {
    setEdit(true);
    setTitle("Update User");
    setOpen(true);
    dispatch(GetUserbycode(code));
  };
  const handleDelete = (code) => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(DeleteUser(code));
    }
  };

  const delaySearch = () => {
    dispatch(GetSeachResult(searchQ, setLoading));
    setTimeout(() => {
      // setLoading(false);
    }, 10000);
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchQ(value);
    if (searchQ.length > 2) {
      setLoading(true);
      delaySearch();
    }
  };

  const clearstate = () => {
    setId(0);
    setName("");
    setEmail("");
    setJobTitle("");
    setUserRole("");
    setPassword("");
    setProfilePhoto("");
  };
  useEffect(() => {
    return props.loaduser();
  }, []);

  return (
    <>
      <div>
        <h1>User List</h1>

        <Input
          sx={{ marginLeft: "2%" }}
          placeholder="Search"
          label="Search"
          onChange={handleSearch}
          value={searchQ}
        />
      </div>
      <div>
        <Paper sx={{ margin: "1%" }}>
          <div style={{ margin: "1%" }}>
            <Button
              sx={{ marginLeft: "90%" }}
              onClick={functionadd}
              variant="contained"
            >
              Add New
            </Button>
          </div>
          <TableContainer>
            {loading ? (
              <>
                <p>....Loading</p>
              </>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "teal" }}>
                      {columns.map((column) => {
                        return (
                          <TableCell style={{ color: "white" }} key={column.id}>
                            {column.name}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.userstate.userlist &&
                      props.userstate.userlist.map((row, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.jobTitle}</TableCell>
                            <TableCell>{row.userRole}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                              <img
                                style={{ width: "15%" }}
                                src={row.profilePhoto}
                                alt="error"
                              />
                            </TableCell>
                            <TableCell sx={{ display: "flex" }}>
                              <Button
                                onClick={(e) => {
                                  handleEdit(row.id);
                                }}
                                sx={{ margin: "1%" }}
                                variant="contained"
                                color="primary"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={(e) => {
                                  handleDelete(row.id);
                                }}
                                variant="contained"
                                color="error"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        </Paper>
        <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
          <DialogTitle>
            <span>{title}</span>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} margin={2}>
                <TextField
                  required
                  error={name.length === 0}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  variant="outlined"
                  label="Name"
                ></TextField>
                <TextField
                  required
                  error={name.length === 0}
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                  }}
                  variant="outlined"
                  label="Job Title"
                  disabled={edit}
                ></TextField>
                <TextField
                  required
                  error={name.length === 0}
                  value={userRole}
                  onChange={(e) => {
                    setUserRole(e.target.value);
                  }}
                  variant="outlined"
                  label="User Role"
                  disabled={edit}
                ></TextField>
                <TextField
                  required
                  error={name.length === 0}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  variant="outlined"
                  label="Email"
                ></TextField>
                <TextField
                  required
                  error={name.length === 0}
                  value={password}
                  name="password"
                  onChange={handlePassword}
                  variant="outlined"
                  label="Password"
                  type="password"
                ></TextField>
                <TextField
                  required
                  error={confirmPass !== password}
                  value={confirmPass}
                  name="confirmPassword"
                  onChange={handlePassword}
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                ></TextField>
                <p
                  style={{
                    display: [
                      password !== confirmPass && password.length > 0
                        ? ""
                        : "none",
                    ],
                  }}
                >
                  Passwod doesn't match
                </p>
                <TextField
                  required
                  error={name.length === 0}
                  value={profilePhoto}
                  onChange={(e) => {
                    setProfilePhoto(e.target.value);
                  }}
                  variant="outlined"
                  label="Profile Pic URL"
                ></TextField>

                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    userstate: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loaduser: () => dispatch(GetAllUsers()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(User);

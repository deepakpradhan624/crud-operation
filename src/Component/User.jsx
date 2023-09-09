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
} from "@mui/material";
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  GetUserbycode,
  UpdateUser,
} from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";

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
  const [profilePhoto, setProfilePhoto] = useState("");
  const [open, setOpen] = useState(false);

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
      profilePhoto,
    };

    if (edit) {
      dispatch(UpdateUser(_obj));
    } else {
      dispatch(CreateUser(_obj));
    }
    closepopup();
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
      </div>
      <div>
        <Paper sx={{ margin: "1%" }}>
          <div style={{ margin: "1%" }}>
            <Button onClick={functionadd} variant="contained">
              Add New
            </Button>
          </div>
          <TableContainer>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  variant="outlined"
                  label="Password"
                ></TextField>
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

import { toast } from "react-toastify";
import {
  AddRequest,
  DeleteRequest,
  UpdateRequest,
  failRequest,
  getbycodeSuccess,
  makeRequest,
  successRequest,
} from "./Action";
import axios from "axios";
export const GetAllUsers = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get("http://localhost:8000/user")
      .then((res) => {
        const _list = res.data;
        dispatch(successRequest(_list));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
export const GetUserbycode = (code) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/user/" + code)
      .then((res) => {
        const _obj = res.data;
        dispatch(getbycodeSuccess(_obj));
        //   toast.success("User update successfully");
      })
      .catch((err) => {
        toast.error("Failed to update user");
      });
  };
};

export const CreateUser = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/user", data)
      .then((res) => {
        dispatch(AddRequest(data));
        toast.success("User created successfully");
      })
      .catch((err) => {
        toast.error("Failed to create user");
      });
  };
};

export const UpdateUser = (data) => {
  return (dispatch) => {
    axios
      .put("http://localhost:8000/user/" + data.id, data)
      .then((res) => {
        dispatch(UpdateRequest(data));
        toast.success("User updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update user");
      });
  };
};

export const DeleteUser = (code) => {
  return (dispatch) => {
    axios
      .delete("http://localhost:8000/user/" + code)
      .then((res) => {
        dispatch(DeleteRequest(code));
        toast.success("User removed successfully");
      })
      .catch((err) => {
        toast.error("Failed to delete user");
      });
  };
};

import {
  ADD_SUCCESS,
  DELETE_SUCCESS,
  FAIL_REQUEST,
  MAKE_REQUEST,
  OPEN_POPUP,
  REQ_GETBYCODE_SUCC,
  SUCCESS_REQUEST,
  UPDATE_SUCCESS,
} from "./ActionType";

export const initialState = {
  isLoading: false,
  userlist: [],
  userobj: {},
  errormessage: "",
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_REQUEST:
      return {
        ...state,
        isLoading: false,
        userlist: action.payload,
      };
    case REQ_GETBYCODE_SUCC:
      return {
        ...state, 
        userobj: action.payload
      };

    case FAIL_REQUEST:
      return {
        ...state,
        isLoading: false,
        userlist: [],
        errormessage: action.payload,
      };
    case OPEN_POPUP:
      return {
        ...state,
        userobj: {},
      };

    case ADD_SUCCESS:
      const _inputdata = { ...action.payload };
      const _maxid = Math.max(...state.userlist.map((el) => el.id));
      _inputdata.id = _maxid + 1;
      return {
        ...state,
        userlist: [...state.userlist, _inputdata],
      };

      case UPDATE_SUCCESS:
        const _data = { ...action.payload };
        const _finaldata=state.userlist.map(item=>{
            return item.id===_data.id?_data:item
        })
        return {
          ...state,
          userlist: _finaldata
        };

        case DELETE_SUCCESS:
       
        const _filterdata=state.userlist.filter((data)=>{
            return data.id !== action.payload
        })
        return {
          ...state,
          userlist:_filterdata
        };

    default:
      return state;
  }
};

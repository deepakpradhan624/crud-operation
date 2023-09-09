import { ADD_SUCCESS, DELETE_SUCCESS, FAIL_REQUEST, MAKE_REQUEST, OPEN_POPUP, REQ_GETBYCODE_SUCC,  SUCCESS_REQUEST, UPDATE_SUCCESS } from "./ActionType"

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}


export const successRequest=(data)=>{
    return{
        type:SUCCESS_REQUEST,
        payload:data

    }
}

export const failRequest=(err)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}

export const OpenPopup=()=>{
    return{
        type:OPEN_POPUP
    }
}

export const AddRequest=(data)=>{
    return{
        type:ADD_SUCCESS,
        payload:data
    }
}

export const UpdateRequest=(data)=>{
    return{
        type:UPDATE_SUCCESS,
        payload:data
    }
}

export const DeleteRequest=(code)=>{
    return{
        type:DELETE_SUCCESS,
        payload:code
    }
}


export const getbycodeSuccess=(data)=>{
    return{
        type:REQ_GETBYCODE_SUCC,
        payload:data
    }
}
import React, {useState, createContext, useEffect, useContext, useReducer} from  'react'


const initialState = {

    staff:null,
    loading:false,
    error:null
}

export const RegContext  = createContext(initialState)

const regReducer =(action, state)=>{

    switch(action.type){

        case 'regStart':

        return{

            staff:null,
            loading:true,
            error:null
        }

        case 'regComplete':

        return{

            staff:action.payload,
            loading:false,
            error:null
        }

        case 'regFail':

        return{

            staff:null,
            loading:false,
            error:action.payload
        }

        default:return state
    }
}




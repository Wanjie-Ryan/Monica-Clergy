import React, {createContext, useReducer} from 'react'



const initialState = {

    staff:null,
    loading:false,
    error:null
}

export const LogContext = createContext(initialState)

const logReducer  = (state, action) =>{

    switch(action.type){

        case 'logStart':

        return{

            staff:null,
            loading:true,
            error:null

        }

        case 'logComplete':

        return{

            staff:action.payload,
            loading:false,
            error:null
        }

        case 'logFail':

        return{

            staff:null,
            loading:false,
            error:action.payload
        }

        default:return state


    }
} 

export const LogContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(logReducer, initialState)

    return(

        <LogContext.Provider value={{staff:state.staff, loading:state.loading, error:state.error, dispatch}}>

            {children}

        </LogContext.Provider>
    )
}
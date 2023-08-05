import React, { createContext, useReducer } from "react";

const initialState = {
  staff: null,
  loading: false,
  error: null,
};

export const RegContext = createContext(initialState);

const regReducer = (action, state) => {
  switch (action.type) {
    case "regStart":
      return {
        staff: null,
        loading: true,
        error: null,
      };

    case "regComplete":
      return {
        staff: action.payload,
        loading: false,
        error: null,
      };

    case "regFail":
      return {
        staff: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const RegContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(regReducer, initialState);

  return (
    <RegContext.Provider
      value={{
        staff: state.staff,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RegContext.Provider>
  );
};

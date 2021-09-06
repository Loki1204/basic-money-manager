import React, { createContext, useReducer } from "react";

import * as api from "../api/index";
import TransactionReducer from "../reducers/TransactionReducer";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTION_ERROR,
} from "../constants/actionTypes";

// Initial state
const initialState = {
  creator: "",
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);
  
    // Global function for getting all transactions
  async function getTransactions() {
    try {
      const res = await api.getTransactions();

      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
      });
    }
  }

    // Global function for deleting a transaction
  async function deleteTransaction(id) {
    try {
      await api.deleteTransaction(id);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
      });
    }
  }

    // Global function for adding a transaction
  async function addTransaction(transaction) {
    try {
      const res = await api.addTransaction(transaction);
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

import {
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
} from "./transactionsActionTypes";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };

    case TRANSACTION_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  //create account
  const createTransactionAction = async (accountData) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.post(API_URL_TRANSACTION, accountData, config);

      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_CREATION_SUCCESS, payload: res?.data });
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //UPDATE TRANSACTION
  const updateTransactionAction = async (id, accountData) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.put(
        `${API_URL_TRANSACTION}/${id}`,
        accountData,
        config
      );

      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_UPDATE_SUCCESS, payload: res?.data });
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //DELETE TRANSACTION
  const deleteTransactionAction = async (id, accountData) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.delete(
        `${API_URL_TRANSACTION}/${id}`,
        accountData,
        config
      );

      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_DELETE_SUCCESS, payload: res?.data });
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_DELETE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        updateTransactionAction,
        deleteTransactionAction,
        open: open,
        setOpen: setOpen,
        id: id,
        setId: setId,
        error: state?.error,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};

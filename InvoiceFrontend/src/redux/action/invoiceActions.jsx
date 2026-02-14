import api from "../../api/axios";

import {
  INVOICE_FETCH_REQUEST,
  INVOICE_FETCH_SUCCESS,
  INVOICE_FETCH_FAIL,
  PAYMENT_ADD_REQUEST,
  PAYMENT_ADD_SUCCESS,
  PAYMENT_ADD_FAIL,
  INVOICE_ARCHIVE_REQUEST,
  INVOICE_ARCHIVE_SUCCESS,
  INVOICE_ARCHIVE_FAIL,
  INVOICE_RESTORE_REQUEST,
  INVOICE_RESTORE_SUCCESS,
  INVOICE_RESTORE_FAIL,
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_SUCCESS,
  INVOICE_LIST_FAIL,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAIL,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
} from "../actionTypes/invoiceActionTypes";

// -------------------------
// Fetch Invoice List
// -------------------------
export const fetchInvoiceList = () => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_LIST_REQUEST });

    const res = await api.get("/invoices");

    dispatch({
      type: INVOICE_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: INVOICE_LIST_FAIL,
      payload: error.response?.data?.message || "Failed to fetch invoices",
    });
  }
};

// -------------------------
// Create Invoice
// -------------------------
export const createInvoice = (invoiceData) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_CREATE_REQUEST });

    const res = await api.post("/invoices", invoiceData);

    dispatch({
      type: INVOICE_CREATE_SUCCESS,
      payload: res.data,
    });

    return res.data.invoice;
  } catch (error) {
    dispatch({
      type: INVOICE_CREATE_FAIL,
      payload: error.response?.data?.message || "Failed to create invoice",
    });

    return null;
  }
};

// -------------------------
// Fetch Invoice Details
// -------------------------
export const fetchInvoiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_FETCH_REQUEST });

    const res = await api.get(`/invoices/${id}`);

    dispatch({
      type: INVOICE_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: INVOICE_FETCH_FAIL,
      payload: error.response?.data?.message || "Failed to fetch invoice",
    });
  }
};

// -------------------------
// Add Payment
// -------------------------
export const addPayment = (invoiceId, amount) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_ADD_REQUEST });

    await api.post(`/invoices/${invoiceId}/payments`, { amount });

    dispatch({ type: PAYMENT_ADD_SUCCESS });

    const res = await api.get(`/invoices/${invoiceId}`);

    dispatch({
      type: INVOICE_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_ADD_FAIL,
      payload: error.response?.data?.message || "Failed to add payment",
    });
  }
};

// -------------------------
// Archive Invoice
// -------------------------
export const archiveInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_ARCHIVE_REQUEST });

    await api.post("/invoices/archive", { id: invoiceId });

    dispatch({ type: INVOICE_ARCHIVE_SUCCESS });

    const res = await api.get(`/invoices/${invoiceId}`);

    dispatch({
      type: INVOICE_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: INVOICE_ARCHIVE_FAIL,
      payload: error.response?.data?.message || "Failed to archive invoice",
    });
  }
};

// -------------------------
// Restore Invoice
// -------------------------
export const restoreInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_RESTORE_REQUEST });

    await api.post("/invoices/restore", { id: invoiceId });

    dispatch({ type: INVOICE_RESTORE_SUCCESS });

    const res = await api.get(`/invoices/${invoiceId}`);

    dispatch({
      type: INVOICE_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: INVOICE_RESTORE_FAIL,
      payload: error.response?.data?.message || "Failed to restore invoice",
    });
  }
};



// Delete Invoice
// -------------------------
// -------------------------
// Delete Invoice
// -------------------------
export const deleteInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INVOICE_REQUEST });

    await api.delete(`/invoices/${invoiceId}`);

    dispatch({
      type: DELETE_INVOICE_SUCCESS,
      payload: invoiceId,
    });

    // Refresh list after delete
    dispatch(fetchInvoiceList());
  } catch (error) {
    dispatch({
      type: DELETE_INVOICE_FAIL,
      payload: error.response?.data?.message || "Failed to delete invoice",
    });
  }
};

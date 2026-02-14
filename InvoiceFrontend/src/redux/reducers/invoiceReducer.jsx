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
} from "../actionTypes/invoiceActionTypes";

const initialState = {
  loading: false,
  invoice: null,
  lineItems: [],
  payments: [],
  total: 0,
  amountPaid: 0,
  balanceDue: 0,
  error: null,

  // list state
  invoiceListLoading: false,
  invoices: [],
  invoiceListError: null,

  // create state
  createLoading: false,
  createError: null,
  createdInvoice: null,

  paymentLoading: false,
  archiveLoading: false,
  restoreLoading: false,
};

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------------------
    // Create Invoice
    // --------------------------
    case INVOICE_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createdInvoice: null,
      };

    case INVOICE_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createdInvoice: action.payload.invoice,
        createError: null,
      };

    case INVOICE_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
      };

    // --------------------------
    // Invoice List
    // --------------------------
    case INVOICE_LIST_REQUEST:
      return {
        ...state,
        invoiceListLoading: true,
        invoiceListError: null,
      };

    case INVOICE_LIST_SUCCESS:
      return {
        ...state,
        invoiceListLoading: false,
        invoices: action.payload,
        invoiceListError: null,
      };

    case INVOICE_LIST_FAIL:
      return {
        ...state,
        invoiceListLoading: false,
        invoiceListError: action.payload,
      };

    // --------------------------
    // Invoice Details
    // --------------------------
    case INVOICE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case INVOICE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload.invoice,
        lineItems: action.payload.lineItems,
        payments: action.payload.payments,
        total: action.payload.total,
        amountPaid: action.payload.amountPaid,
        balanceDue: action.payload.balanceDue,
        error: null,
      };

    case INVOICE_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // --------------------------
    // Payment Add
    // --------------------------
    case PAYMENT_ADD_REQUEST:
      return {
        ...state,
        paymentLoading: true,
        error: null,
      };

    case PAYMENT_ADD_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
      };

    case PAYMENT_ADD_FAIL:
      return {
        ...state,
        paymentLoading: false,
        error: action.payload,
      };

    // --------------------------
    // Archive
    // --------------------------
    case INVOICE_ARCHIVE_REQUEST:
      return {
        ...state,
        archiveLoading: true,
        error: null,
      };

    case INVOICE_ARCHIVE_SUCCESS:
      return {
        ...state,
        archiveLoading: false,
      };

    case INVOICE_ARCHIVE_FAIL:
      return {
        ...state,
        archiveLoading: false,
        error: action.payload,
      };

    // --------------------------
    // Restore
    // --------------------------
    case INVOICE_RESTORE_REQUEST:
      return {
        ...state,
        restoreLoading: true,
        error: null,
      };

    case INVOICE_RESTORE_SUCCESS:
      return {
        ...state,
        restoreLoading: false,
      };

    case INVOICE_RESTORE_FAIL:
      return {
        ...state,
        restoreLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

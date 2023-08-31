// ##################################################################
// #  File Name: helper.js                                          #
// #                                                                #
// #  Description: core helper functions for every versions         #
// #                                                                #
// #  Commented By: Lasantha Lakmal                                 #
// ##################################################################

const { CUSTOM_CODE } = require("./errors");

const _spanFinished = (span, response, err) => {
  if (!span) return;

  if (err) {
    const stack = err.stack ? err.stack : null;
    // Tracer.createErrorLog(span, response, stack);
  } else {
    // Tracer.createLog(span, 'finished', {
    //   method: 'success',
    //   component: 'helper'
    // });
  }

  span.finish();
};

/**
 * Convert promise call result to array
 * @param {Promise} promise - promise object
 *
 * @returns {[]} Return [err, data] array
 */
const to = (promise) => {
  return promise

    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
};

/**
 * Throw error and if isLog is true, create a log
 * @param {*} err - Any kind of error
 * @param {boolean} isLog - Error log or not
 */
const TE = (err, isLog = false) => {
  if (isLog) {
    console.error(err);
  }

  throw err;
};

/**
 * Create succes response
 * @param {Response} res - Response object
 * @param {number} code - Http Sucess code
 * @param {*} data - Final result. object, array ...
 * @return {Object} Return HTTP Response: {
 *  code: 200,
 *  data: (*),
 *  success: true
 * }
 */
const SUCCESS = (res, codeObj, data, span = null) => {
  const { hc, code, message } = codeObj;

  _spanFinished(span);

  let response = CUSTOM_CODE._200(data);

  if (hc && code && message) {
    response = CUSTOM_CODE[`_${hc}`](data, codeObj);
  }

  res.status(response.httpCode).json(response);

  return response;
};

/**
 * Create error response
 * @param {Response} res - Response object
 * @param {Object} error - Error object
 * @return {Object} Return HTTP Response
 */
const ERROR = (res, err, span = null, traceId = "") => {
  try {
    const error = err.error ? err.error : err;

    let response = CUSTOM_CODE._500(error);

    if (error && error.hc && error.message) {
      response = CUSTOM_CODE[`_${error.hc}`](error);
    }

    _spanFinished(span, response, error);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  } catch (catchErr) {
    console.log("****", catchErr);

    Sentry.captureException(err);

    const response = CUSTOM_CODE._400(err);

    _spanFinished(span, response, catchErr);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  }
};

/**
 * Create validation error response
 * @param {Response} res - Response object
 * @param {Object} error - Error object
 * @return {Object} Return HTTP Response
 */
const VALIDATION_ERROR = (res, err, span = null, traceId = "") => {
  try {
    const error = err.error ? err.error : err;

    let response = CUSTOM_CODE._400(error);

    if (error && error.hc && error.message) {
      response = CUSTOM_CODE[`_${error.hc}`](error);
    }

    _spanFinished(span, response, error);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  } catch (catchErr) {
    console.log("****", catchErr);

    Sentry.captureException(err);

    const response = CUSTOM_CODE._400(err);

    _spanFinished(span, response, catchErr);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  }
};

const UNAUTHORIZED_ERROR = (res, err, span = null, traceId = "") => {
  try {
    const error = err.error ? err.error : err;

    let response = CUSTOM_CODE._401(error);

    if (error && error.hc && error.message) {
      response = CUSTOM_CODE[`_${error.hc}`](error);
    }

    _spanFinished(span, response, error);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  } catch (catchErr) {
    console.log("****", catchErr);

    Sentry.captureException(err);

    const response = CUSTOM_CODE._400(err);

    _spanFinished(span, response, catchErr);

    return res.status(response.httpCode).json({
      ...response,
      traceId,
    });
  }
};

const mapError = (err, message) => {
  const error = {
    message: message,
    stack: err.stack,
    errorInfo: err.errorInfo,
  };

  if (typeof err === "string") {
    error.error = err;
    return error;
  }

  if (err.message) {
    error.error = err.message;
    return error;
  }

  if (err.message && err.code) {
    error.error = err.message;
    error.code = err.code;
    return error;
  }

  if (err.error) {
    error.error = err.error;
    return error;
  }

  if (typeof err === "object") {
    error.error = JSON.stringify(err);
    return error;
  }

  console.error(err);

  error.error =
    "unknown error, please check initiation-workflow consol log manual";
  return error;
};

const parseToObject = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

/**
 * @module helper
 */
module.exports = {
  to,
  TE,
  SUCCESS,
  ERROR,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  mapError,
  parseToObject,
};

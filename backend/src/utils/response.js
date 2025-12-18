const sendResponse = (res, statusCode, message, data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  res.status(statusCode).json(response);
};

module.exports = { sendResponse };

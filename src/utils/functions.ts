const createErrorMessage = (statusCode: number, message: string) => ({
  statusCode,
  message
});

export {
  createErrorMessage,
}

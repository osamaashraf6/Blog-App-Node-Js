// 1. ApiError
class ApiError extends Error {
  private status: string;
  constructor(private statusCode: number, message: string) {
    super(message);
    this.status = `${statusCode}`.startsWith("4")
      ? "API Request Error"
      : "Internal Server Error";
  }
}

export default ApiError;

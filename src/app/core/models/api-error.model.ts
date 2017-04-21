export interface ApiError {
  errors?: { [key: string]: any };
  message: string;
}

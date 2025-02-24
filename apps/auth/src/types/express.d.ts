declare namespace Express {
  export interface Request {
    cookie: { token?: string };
  }
}

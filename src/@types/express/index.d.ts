declare namespace Express {
  export interface Request {
    payload: {
      role: string;
      name: string;
    };
  }
}

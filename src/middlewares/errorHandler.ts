import { Request, Response, NextFunction } from 'express';

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'Only jpg and png allowed') {
    return res.status(406).json({message: 'Only images jpg and png allowed'})
  }
  if (err.statusCode) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }
  return res.status(500).json({ message: 'internal error' });
}

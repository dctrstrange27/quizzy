import { Request, Response } from 'express';

// const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
//   const statusCode: number = res.statusCode ? res.statusCode : 500;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack
//   });
// };

// export { errorHandler };

export const errorHandler =(err:any,req:Request,res:Response,next:any )=>{
          const statusCode:number  = res.statusCode ? res.statusCode: 500;
          res.status(statusCode)
          res.json({
                    message:err.message,
                    stack: process.env.NODE_ENV === 'production' ? null : err.stack
          })

}
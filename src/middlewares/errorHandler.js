// not found 

const notFound = (req, res , next)=>{
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next();
    }
    
    // error handler
    
    const errorHandler = (err ,req, res, next) =>{
        const statuscode = res.statusCode == 200 ? 500: res.statusCode;
        res.status(statuscode);
     return res.json({
            message: err?.message,
            stack: err?.stack,
        });
    
    };
    
    export  {errorHandler, notFound}
const errorMiddleware = (err,req,res,next)=>{
       
    err.statusCode = err.statusCode || 400;
    err.message = err.message || 'All inputs filed is required'

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack :err.stack
    })
}

export default errorMiddleware
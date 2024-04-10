const CustomReponse = {
    sendResponse:(statusCode,status, message, data)=>{
        return {
            statusCode,status,message,data
        }
    }
}
module.exports = CustomReponse;
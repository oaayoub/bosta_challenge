
class ServiceError extends Error {
    constructor(msg, status=400) {
        //service have 400 error code 
        //as it process the user request
        //If it fails that means it recieved a bad or non-complete request 
        super(msg);
        this.status = status
        this.message = status
    }
}
module.exports = ServiceError
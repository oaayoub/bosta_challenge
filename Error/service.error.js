
class BadRequestError extends Error {
    constructor(msg) {
        //service have 400 error code 
        //as it process the user request
        //If it fails that means it recieved a bad or non-complete request 
        super(msg);
        this.status = 400
    }
}
module.exports = BadRequestError
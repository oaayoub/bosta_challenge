class InternalError extends Error {
    //Use error 500 for Internal because that means
    //we recieved good query from Service
    //Internal Errors comes from postgres & helpers
    constructor(msg, status = 500) {
        super(msg);
        this.status = status;
    }
}

module.exports = InternalError
class InternalServerError extends Error {
    //Use error 500 for Internal because that means
    //we recieved good query from Service
    //Internal Errors comes from postgres & helpers
    constructor(msg) {
        super(msg);
        this.status = 500;
    }
}

module.exports = InternalServerError
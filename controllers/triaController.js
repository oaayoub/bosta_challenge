const registerView = (req, res) => {
    res.send("<h1>registerView called</h1>" );
}
// For View 
const loginView = (req, res) => {

    res.send({"login" : "omar logges in"});

}
const basicView = (req, res) => {

    res.send({"login" : "omar logges in"});

}

module.exports =  {
    registerView,
    loginView,
    basicView
};
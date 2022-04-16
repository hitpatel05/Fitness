//For local setup
const local = {
    apiUrl: "https://create-node-fitness-app.herokuapp.com",
    PORT: ""
};

//For staging server
const staging = {
    apiUrl: "https://create-node-fitness-app.herokuapp.com",
    //apiUrl: "http://localhost:",
    PORT: ""
};

//For production server
const production = {
    apiUrl: "https://create-node-fitness-app.herokuapp.com",
    //apiUrl: "http://localhost:",
    PORT: ""
};

if (process.env.REACT_APP_ENV === "local") module.exports = local;
else if (process.env.REACT_APP_ENV === "staging") module.exports = staging;
else if (process.env.REACT_APP_ENV === "production") module.exports = production;
else module.exports = staging;

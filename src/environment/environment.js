//For local setup
const local = {
    apiUrl: "http://localhost:",
    PORT: "3155"
};

//For staging server
const staging = {
    apiUrl: "http://54.201.160.69:",
    //apiUrl: "http://localhost:",
    PORT: "3155"
};

//For production server
const production = {
    apiUrl: "http://54.201.160.69:",
    //apiUrl: "http://localhost:",
    PORT: "3155"
};

if (process.env.REACT_APP_ENV === "local") module.exports = local;
else if (process.env.REACT_APP_ENV === "staging") module.exports = staging;
else if (process.env.REACT_APP_ENV === "production") module.exports = production;
else module.exports = staging;
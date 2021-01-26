class Environment {

    getApiUrl = () => {
        return process.env.REACT_APP_API_URL;
    };

    getPublicUrl = () => {
        return process.env.PUBLIC_URL;
    };

}

export default new Environment();
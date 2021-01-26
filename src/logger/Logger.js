class Logger {

    info = (...data) => {
        console.log(data);
    };

    warning = (...data) => {
        console.warn(data);
    };

    error = (...data) => {
        console.error(data);
    }
}

export default new Logger();

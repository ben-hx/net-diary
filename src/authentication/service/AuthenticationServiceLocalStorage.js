import LocalStorage from "../../localStorage/LocalStorage";

let currentUser = null;

const CURRENT_USER_KEY = 'CURRENT_USER';

class AuthenticationService {

    initialize = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                currentUser = LocalStorage.get(CURRENT_USER_KEY);
                resolve(currentUser);
            }, 1000);
        });
    };

    isAuthenticated = () => {
        return currentUser !== null;
    };

    login = () => {
        return new Promise((resolve) => {
            currentUser = {};
            LocalStorage.store(CURRENT_USER_KEY, currentUser);
            resolve(currentUser);
        });
    };

    logout = () => {
        return new Promise((resolve) => {
            currentUser = null;
            LocalStorage.remove(CURRENT_USER_KEY);
            resolve();
        });
    };

}

export default AuthenticationService;

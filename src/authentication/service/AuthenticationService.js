import LocalStorage from "../../localStorage/LocalStorage";
import NetworkServiceInstance from "../../network/service/NetworkService";

const AUTH_DATA_KEY = 'AUTH_DATA_KEY';

class AuthenticationService {

    initialize = () => {
        NetworkServiceInstance.addRequestInterceptor(this.addAccessTokenToHeader, undefined);
        NetworkServiceInstance.addResponseInterceptor(undefined, this.refreshTokenIfNecessary);
        return Promise.resolve(true);
    };

    addAccessTokenToHeader = (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            config.headers = {
                'Authorization': `Bearer ${accessToken.value}`
            }
        }
        return config;
    }

    refreshTokenIfNecessary = (error) => {
        const originalRequest = error.config;
        const hasRefreshToken = this.getRefreshToken() !== null;
        const isUnauthorized = error.response.status === 401;
        const isNotRefreshResource = originalRequest.url !== '/refresh';
        if (hasRefreshToken && isUnauthorized && isNotRefreshResource) {
            return this.refresh()
                .then(_ => NetworkServiceInstance.reRunRequest(originalRequest))
                .catch(e => {
                    this.removeAuthData();
                    throw e;
                });
        }
        return Promise.reject(error);
    }

    getAccessToken = () => {
        const data = this.loadAuthData();
        if (data) {
            return data.accessToken
        }
        return null;
    }

    getRefreshToken = () => {
        const data = this.loadAuthData();
        if (data) {
            return data.refreshToken
        }
        return null;
    }

    isAuthenticated = () => {
        return this.loadAuthData() !== null;
    };

    login = (username, password) => {
        this.removeAuthData();
        return NetworkServiceInstance.post('/login', {
            username,
            password
        }).then((response) => {
            this.storeAuthData(response.data);
            return true;
        }).catch((e) => {
            throw e.response.data
        });
    };

    logout = () => {
        this.removeAuthData();
        return Promise.resolve(true);
    };

    refresh = () => {
        const refreshToken = this.getRefreshToken();
        return NetworkServiceInstance.post('/refresh', {refreshToken: refreshToken.value}).then((response) => {
            this.storeAuthData(response.data);
            return true;
        }).catch((e) => {
            throw e.response.data
        });
    };

    loadAuthData = () => {
        return LocalStorage.get(AUTH_DATA_KEY);
    }

    storeAuthData = (data) => {
        LocalStorage.store(AUTH_DATA_KEY, data);
    }

    removeAuthData = () => {
        LocalStorage.remove(AUTH_DATA_KEY);
    }
}

export default AuthenticationService;

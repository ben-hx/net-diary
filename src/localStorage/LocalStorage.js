class LocalStorage {

    store = (key, object) => {
        localStorage.setItem(key, JSON.stringify(object));
    };

    get = (key) => {
        return JSON.parse(localStorage.getItem(key));
    };

    remove = (key) => {
        localStorage.removeItem(key);
    }

    removeAll = () => {
        localStorage.clear();
    };

}

export default new LocalStorage();

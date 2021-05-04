import NetworkServiceInstance from "../../network/service/NetworkService";

class SketchService {

    get() {
        return NetworkServiceInstance.get(`/sketch`).then((response) => {
            return response.data;
        });
    }

    upsert(entry) {
        return NetworkServiceInstance.put(`/sketch`, entry).then((response) => {
            return response.data;
        });
    }
}

export default SketchService;

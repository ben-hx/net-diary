import DateUtils from "../../date/utils/DateUtils";
import NetworkServiceInstance from "../../network/service/NetworkService";

class DiaryRepository {

    getByDate(date) {
        const key = DateUtils.formatInternal(date);
        return NetworkServiceInstance.get(`/diary/${key}`).then((response) => {
            return response.data;
        });
    }

    upsert(entry) {
        const key = DateUtils.formatInternal(entry.date);
        return NetworkServiceInstance.put(`/diary/${key}`, entry).then((response) => {
            return response.data;
        });
    }

}

export default new DiaryRepository();

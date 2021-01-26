import DiaryRepository from "../../dairy/repository/DiaryRepository";

class HomeService {

    getEntryByDate(date) {
        return DiaryRepository.getByDate(date);
    }

    upsertEntry(entry) {
        return DiaryRepository.upsert(entry);
    }
}

export default HomeService;

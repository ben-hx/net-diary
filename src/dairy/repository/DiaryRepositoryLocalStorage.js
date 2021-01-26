import DateUtils from "../../date/utils/DateUtils";

const DIARY_ITEMS = 'diaryItems';

const getItems = () => {
    return JSON.parse(localStorage.getItem(DIARY_ITEMS)) || {};
}

const setItems = (items) => {
    return localStorage.setItem(DIARY_ITEMS, JSON.stringify(items));
}

class DiaryRepository {

    getByDate(date) {
        const key = DateUtils.formatInternal(date);
        const result = getItems()[key] || {date: DateUtils.withOutTime(date), value: null}
        return Promise.resolve(result);
    }

    upsert(entry) {
        const items = getItems();
        const key = DateUtils.formatInternal(entry.date);
        items[key] = entry;
        setItems(items);
        return Promise.resolve(entry);
    }

}

export default new DiaryRepository();

import moment from 'moment';

class DateUtils {

    today() {
        const result = moment().startOf("day");
        return new Date(result);
    }

    isToday(value) {
        return moment(value).startOf("day").isSame(this.today());
    }

    yesterday() {
        const result = moment().startOf("day").subtract(1, 'day');
        return new Date(result);
    }

    isYesterday(value) {
        return moment(value).startOf("day").isSame(this.yesterday());
    }

    tomorrow() {
        const result = moment().startOf("day").add(1, 'day');
        return new Date(result);
    }

    isTomorrow(value) {
        return moment(value).startOf("day").isSame(this.tomorrow());
    }

    withOutTime(date) {
        const result = moment(date).startOf("day");
        return new Date(result);
    }

    formatInternal(date) {
        return moment(date).format(moment.HTML5_FMT.DATE);
    }

    fromUrl(dateString) {
        const momentDate = moment(dateString);
        if (momentDate.isValid()) {
            return new Date(momentDate.startOf("day"));
        }
        return null;
    }

    addDays(date, days) {
        return new Date(moment(date).add(days, 'days'));
    }
}

export default new DateUtils();

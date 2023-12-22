import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value) =>
    new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
        value
    );

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
        .replace("about ", "")
        .replace("in", "In");

export const subtractDates = (dateStr1, dateStr2) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const getToday = (options = {}) => {
    const today = new Date();

    if (options?.end) today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);

    return today.toISOString();
};

export const prepareData = (startData, stays) => {
    function incArrayValue(arr, field) {
        return arr.map((obj) =>
            obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    const data = stays
        .reduce((arr, cur) => {
            const num = cur.numNights;
            if (num === 1) return incArrayValue(arr, "1 night");
            if (num === 2) return incArrayValue(arr, "2 nights");
            if (num === 3) return incArrayValue(arr, "3 nights");
            if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
            if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
            if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
            if (num >= 15 && num <= 21)
                return incArrayValue(arr, "15-21 nights");
            if (num >= 21) return incArrayValue(arr, "21+ nights");
            return arr;
        }, startData)
        .filter((obj) => obj.value > 0);

    return data;
};

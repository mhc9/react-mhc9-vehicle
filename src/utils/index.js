import { MONTH_NAMES } from "./constraints"
import moment from "moment";

export const calcAgeY = (birthdate) => {
    if (!birthdate) return 0

    return moment().diff(moment(birthdate), "years") 
};

export const calcUsedAgeY = (firstYear) => {
    return moment().year() - (firstYear-543);
};

export const calculateTotal = (price, amount) => {
    return price * amount;
};

export const calculateNetTotal = (items = [], condition = (args) => false) => {
    return items.reduce((sum = 0, item) => {
        return (condition(item.removed)) ? sum + 0 : sum + parseFloat(item.total);
    }, 0);
};

export const calculateVat = function(netTotal, vatRate) {
    return (netTotal * vatRate) / (100 + vatRate);
};

export const currency = Intl.NumberFormat('th-TH', {maximumFractionDigits:2});

export const currencyToNumber = function(currency) {
    if (typeof currency === 'number') return currency;
    if (currency == '') return 0;

    return currency.replaceAll(',', '');
};

export const toShortTHDate = (dateStr) => {
    if (!dateStr || dateStr === '') return '';

    const [year, month, day] = dateStr.split('-');

    return `${day}/${month}/${parseInt(year, 10) + 543}`;
};

export const toLongTHDate = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const toLongTHDateWithBE = (dateStr) => {
    if (!dateStr || dateStr === '') return '';

    const [year, month, day] = dateStr.split('-');

    return `${parseInt(day, 10)} ${MONTH_NAMES[parseInt(month) - 1]} พ.ศ. ${parseInt(year, 10) + 543}`;
}

export const filterAmphursByChangwat = (changwat, amphurs = []) => {
    return amphurs.filter(amp => amp.chw_id === changwat);
};

export const filterTambonsByAmphur = (amphur, tambons = []) => {
    return tambons.filter(tam => tam.amp_id === amphur);
};

export const generateQueryString = (inputs) => {
    let queryStr = '';

    for (const [key, val] of Object.entries(inputs)) {
        queryStr += `&${key}=${val}`;
    }

    return queryStr;
};

export const isExisted = (items, id) => {
    return items.some(item => item.id === id);
};

export const replaceExpensePattern = (pattern = '', replacement = '') => {
    const [p_amount, p_time, p_price] = pattern.split('X');
    const [r_amount, r_time, r_price] = replacement.split('*');

    return `${p_amount.replace('...', r_amount)}X${p_time.replace('...', r_time)}X${p_price.replace('...', r_price)}`;
};

export const replaceExpensePatternFromDesc = (pattern = '', replacement = '') => {
    if (replacement.includes('+')) {
        const groups = replacement.split('+').map(group => replaceExpensePattern(pattern, group));

        return groups.join('+');
    } else {
        return replaceExpensePattern(pattern, replacement);
    }
};

export const calculateWithPattern = (pattern) => {
    const [amount, time, price] = pattern.split('*');

    return parseFloat(amount) * parseFloat(time) * parseFloat(price);
};

export const calculateTotalFromDescription = (desc = '') => {
    if (desc.includes('+')) {
        const groups = desc.split('+');

        return groups.reduce((sum, curVal) => sum + calculateWithPattern(curVal), 0);
    } else {
        return calculateWithPattern(desc);
    }
};

export const getPatternOfExpense = (expenses, id) => {
    return expenses?.find(exp => exp.id === parseInt(id, 10))?.pattern;
};

export const getFormDataItem = (data, dataName, id) => {
    if (!data) return null;

    return data[dataName].find(item => item.id === id);
}

export const isOverRefundDate = (refundDate) => {
    return moment().diff(moment(refundDate), "days") > 0;
};

export const sortObjectByDate = (a, b, type='ASC') => {
    if (type === 'ASC') {
        return moment(a).toDate() - moment(b).toDate();
    } else {
        return moment(b).toDate() - moment(a).toDate();
    }
    return 
}

export const removeItemWithFlag = (items, id, isNew) => {
    if (isNew) {
        return items.filter(item => item.id !== id);
    } else {
        /** Create new items array by setting removed flag if item is removed by user */
        return items.map(item => {
            if (item.id === id) return { ...item, removed: true };

            return item;
        });
    }
};

export const getUrlParam = (url, paramName) => {
    const params = new URLSearchParams(url);

    return params.get(paramName);
};

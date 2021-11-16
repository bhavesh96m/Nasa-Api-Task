const today = new Date();
const endingDate = new Date("1995-06-16".replace(/-/g, '\/'));
const endingDate2 = new Date("1995-06-20".replace(/-/g, '\/'));

const getYesterday = (day) => {

    if (day.toISOString() == endingDate2.toISOString()) {
        return false;
    }

    const yesterdayDate = new Date(day);
    yesterdayDate.setDate(day.getDate()-1);

    return `${yesterdayDate.getFullYear()}-${yesterdayDate.getMonth()+1}-${yesterdayDate.getDate()}`;
}

const getTomorrow = (day) => {
    const tomorrowDate = new Date(day);
    tomorrowDate.setDate(day.getDate()+1);

    if (tomorrowDate.toISOString() > today.toISOString()) {
        return false;
    }

    return `${tomorrowDate.getFullYear()}-${tomorrowDate.getMonth()+1}-${tomorrowDate.getDate()}`;
}

const checkVeryLastDay = (day) => {
    if (day.toISOString() === endingDate.toISOString()) {
        return false;
    } 

    return true;
}

module.exports = {
    getYesterday,
    getTomorrow,
    checkVeryLastDay
}
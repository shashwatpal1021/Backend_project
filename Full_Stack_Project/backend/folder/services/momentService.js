const moment = require("moment-timezone");

const momentIndianTimeZone = (a, b) => {
    let _moment = (a && b) ? moment(a, b) : a ? moment(a) : moment();
    return _moment.tz("Asia/Kolkata");
};

module.exports = { momentIndianTimeZone };

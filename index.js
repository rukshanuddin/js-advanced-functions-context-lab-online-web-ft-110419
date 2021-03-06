let createEmployeeRecord = function(record) {
    let clockIn = [];
    let clockOut = [];
    let details = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: clockIn,
        timeOutEvents: clockOut
    };
    return details;
};
let createEmployeeRecords = function(records) {
    return records.map(function(record){
        return createEmployeeRecord(record);
    });   
};
let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    });
    return this;
};
let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    });
    return this;
};
let hoursWorkedOnDate = function(date) {
    let hours = 0;
    let clockIn = this.timeInEvents.find(function (key) {
        return key.date === date;
    });
    let clockOut = this.timeOutEvents.find(function (key) {
        return key.date === date;
    });
    hours = (clockOut.hour - clockIn.hour) / 100;
    return hours;
};
let wagesEarnedOnDate = function(date) {
    let wages = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return wages;
};
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};
let findEmployeeByFirstName = function(records, firstName) {
return records.find(function (record) {
    return record.firstName == firstName;
}, 0);
};
let calculatePayroll = function(records) {
     return records.reduce(function (memo, record) {
        return memo + allWagesFor.call(record);
    }, 0);
};
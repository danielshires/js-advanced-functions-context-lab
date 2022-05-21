/* Your Code Here */

let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function(rec) {
    let timesInRecordRow = csvTimesIn.find(function(row) {
        return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function(row) {
        return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp) {
        createTimeInEvent.call(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp) {
        createTimeOutEvent.call(rec, timeOutStamp)
    })
})

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])

// Functions

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {

    const newMap = arrays.map(e => {
        return createEmployeeRecord(e)
    })

    return newMap
}

const nameExtractor = function(record) {
    return record.firstName
}

function createTimeInEvent(dateTimeIn) {

    const timeInObj = {
        type: "TimeIn",
        date: dateTimeIn.split(" ")[0],
        hour: parseInt(dateTimeIn.split(" ")[1])
    }

    this.timeInEvents.push(timeInObj)

    return this
}

function createTimeOutEvent(dateTimeOut) {

    const timeOutObj = {
        type: "TimeOut",
        date: dateTimeOut.split(" ")[0],
        hour: parseInt(dateTimeOut.split(" ")[1])
    }

    this.timeOutEvents.push(timeOutObj)

    return this
}

function hoursWorkedOnDate(dateCheck) {

    const newRecord = []

    for (const date in this.timeInEvents) {
        if (dateCheck === this.timeInEvents[date].date) {
            newRecord.push(this.timeInEvents[date])
        }
    }

    for (const date in this.timeOutEvents) {
        if (dateCheck === this.timeOutEvents[date].date) {
            newRecord.push(this.timeOutEvents[date])
        }
    }

    const result = newRecord[1].hour.toString().slice(0, -2) - newRecord[0].hour.toString().slice(0, -2)

    return result

}

function wagesEarnedOnDate(dateCheck) {

    const hoursWorked = hoursWorkedOnDate.call(this, dateCheck)

    return hoursWorked * this.payPerHour

}

function calculatePayroll(employeeRecords) {

    let grandTotalOwed = employeeRecords.reduce((m, e) => m + allWagesFor.call(e), 0)

    return grandTotalOwed
}

function findEmployeeByFirstName(srcArray, employeeName) {

    const searchResult = srcArray.find(record => {
        return record.firstName === employeeName
    })

    console.log(searchResult)

    return searchResult
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor() {

    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
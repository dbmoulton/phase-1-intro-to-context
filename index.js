function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(employee => {
       return createEmployeeRecord(employee)
    });
}

function createTimeInEvent(empRec, info) {
    const timeCard = info.split(" ")
    let eventObj = {
        type: "TimeIn",
        hour: parseInt(timeCard[1]),
        date: timeCard[0],
    }
    empRec.timeInEvents.push(eventObj);
    return empRec
}

function createTimeOutEvent(empRec, info) {
    const timeCard = info.split(" ")
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(timeCard[1]),
        date: timeCard[0],
    }
    empRec.timeOutEvents.push(eventObj);
    return empRec
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empRec, dateInfo) {
    let wage = hoursWorkedOnDate(empRec, dateInfo) * empRec.payPerHour;
    // console.log(dateInfo)
    return parseFloat(wage)
}

function allWagesFor(empRec) {
    let total = 0
    let dates = empRec.timeInEvents.map(timeInObj => {
            return timeInObj.date.toString()
         });
    // dates.forEach(dateWorked => {
    //     console.log(dateWorked)
    //     let daysWage = wagesEarnedOnDate(empRec, dateWorked)
    //     console.log(total);
    //     console.log(daysWage);
    //     return total + daysWage;
    // }) 
    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(empRec, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }
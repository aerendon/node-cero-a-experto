let employees = [
  {
    id: 1,
    name: 'Alejandro'
  }, {
    id: 2,
    name: 'Laura'
  }, {
    id: 3,
    name: 'Lucho'
  }
];

let salary = [
  {
    id: 1,
    salary: 1000
  }, {
    id: 2,
    salary: 2000
  }, {
    id: 3,
    salary: 3000
  }
];

let getSalary = (employee, callback) => {
  let salatyByEmployee = salary.find(salaryResult => salaryResult.id === employee.id);

  if (!salatyByEmployee) {
    callback(`The employee with ID ${ employee.id } doesn't have salary`);
  } else {
    callback(null, { name: employee.name, salary: salatyByEmployee.salary, id: employee.id });
  }
}

let getEmployee = (id, callback) => {
  let employeeDB = employees.find(employee => employee.id === id);

  if (!employeeDB) {
    callback(`The employee with ID ${ id } doesn't exist`);
  } else {
    callback(null, employeeDB);
  }
}

getEmployee(3, (err, employee) => {
  if (err) {
    return console.log(err);
  }

  getSalary(employee, (err, resp) => {
    if (err) {
      console.log(err);
    }

    console.log(`The ${ resp.name }'s salary is ${ resp.salary }`);
  });
});
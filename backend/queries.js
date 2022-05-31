const { Client } = require("pg");
const {v4:uuidv4} = require("uuid")
const client = new Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "employeedata",
    password: "1552003",
    port: 8000
});

client.connect();

//gets all employees
const getEmployees = (request, response) => {
    client.query("SELECT * FROM employeedata ORDER BY id ASC", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).send(results.rows);
    })
};

//get employee by id
const getEmployeeById = (request, response) => {
    const id = request.params.id;

    client.query("SELECT * FROM employeedata WHERE id = $1", [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).send(results.rows);
    })
};

//insert employee
const addEmployee = (request, response) => {
    const id = uuidv4()
    const {name, dob, phonenumber, address } = request.body;
    client.query(
        "INSERT INTO employeedata (id, name, DOB, phonenumber, address) VALUES ($1, $2, $3, $4, $5)",
        [id, name, dob, phonenumber, address],
        (error, result) => {
            if(error){
                throw error;
            }
            response.status(200).send('Employee added with ID: ${result.id}');
        }
    );
};

const updateEmployee = (request, response) => {
    const {id} = request.params
    const {name, dob, phone, address} = request.body
    client.query("UPDATE public.employees SET name = $1, dob = $2, phone = $3, address = $4 WHERE id = $5",
    [name, dob, phone, address, id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Employee updated with ID: ${id}`)
    })
}

const deleteEmployee = (request, response) => {
    const {id} = request.params
    client.query("DELETE FROM public.employees WHERE id = $1",
    [id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Employee deleted with ID: ${id}`)
    })
}

module.exports = {getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee};
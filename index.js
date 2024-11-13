import mysql from "mysql";
const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'newtest'
});
connection.connect((err) => {
 if (err) {
 console.error('Error connecting to the database:', err);
 return;
 }
 console.log('Connected to the database!');
});
const newEmployee = { name: 'John Doe', age: 30, department: 'HR' };
connection.query('INSERT INTO employees SET ?', newEmployee, (err, result) => {
 if (err) {
 console.error('Error inserting data:', err);
 return;
 }
 console.log('Data inserted successfully!');
});
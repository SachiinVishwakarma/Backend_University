const config        = require('./dbConfig')

sql                 = require('mssql')

const getAllEmployees = async () => {
  try {
    let pool = await sql.connect(config);
    let persons = await pool.request().query("SELECT * FROM Student");
    console.log(persons);
    return persons;
  }
   catch (error) {
    console.error('Error fetching all employees:', error);
  }
};

const getEmployees = async(Name) => {
    try{
        let pool = await sql.connect(config);
        let persons = await pool.request().query(`SELECT * FROM Student WHERE Name ='${Name}'`);
        console.log(persons);
        return persons;
    }
    catch(error){
        console.log(error);
    }
}

const createEmployees = async(Students) => {
  try{
      let pool = await sql.connect(config);
      let persons = pool.request()
      .query(`INSERT INTO STUDENT VALUES 
        (${Students.ID},'${Students.Name}','${Students.City}','${Students.State}')
        `);
      return persons;
  }
  catch(error){
      console.log(error);
  }
}

const deleteEmployees = async(ID) => {
  try{
      let pool = await sql.connect(config);
      let persons = pool.request()
      .query(`DELETE FROM STUDENT WHERE ID ='${ID}'`);
      return persons;
  }
  catch(error){
      console.log(error);
  }
}
const updateEmployee = async(Students) => {
  try {
      let pool = await sql.connect(config);
      let persons = await pool.request()
      .query(`UPDATE Student SET Name = '${Students.Name}', City = '${Students.City}', State = '${Students.State}' WHERE ID = ${Students.ID}`);
      return persons;
  }
  catch(error) {
      console.log(error);
  }
}
module.exports = {
  createEmployees,
  getAllEmployees,
  deleteEmployees,
  getEmployees,
  updateEmployee
}

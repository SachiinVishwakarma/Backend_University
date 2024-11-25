const config        = require('./dbConfig')

sql                 = require('mssql')

const getPerson = async (ID) => {
  try {
    let pool = await sql.connect(config);
    let persons = await pool.request().query(`SELECT * FROM Person Where ID = ${ID}`);
    console.log(persons);
    return persons;
  }
   catch (error) {
    console.error('Error fetching person By ID:', error);
  }
}

const getAllPerson = async () => {
  try {
    let pool = await sql.connect(config);
    let persons = await pool.request().query("SELECT * FROM Person");
    console.log(persons);
    return persons;
  }
   catch (error) {
    console.error('Error fetching all person:', error);
  }
}
const createPerson = async(Person) => {
    try{
        let pool = await sql.connect(config);
        let persons = await pool.request().query(`
            INSERT INTO Person (ID, NAME, Mobile_number, STATE)
            VALUES (${Person.ID}, '${Person.NAME}', ${Person.Mobile_number}, '${Person.STATE}')
        `);
        return persons;
    }
    catch(error){
        console.log(error);
    }
  }

const deletePerson= async(ID)=>{
  let pool=await sql.connect(config);
  let persons= await pool.request().query(`DELETE FROM PERSON WHERE ID=(${ID})`);
  return persons;
}
const updatePerson = async(Person) => {
  try {
      let pool = await sql.connect(config);
      let persons = await pool.request()
      .query(`UPDATE Person SET NAME = '${Person.NAME}', Mobile_number = ${Person.Mobile_number}, STATE = '${Person.STATE}'  WHERE ID = ${Person.ID}`);
      return persons;
  }
  catch(error) {
      console.log(error);
  }
}
module.exports = {
    getPerson,
    getAllPerson,
    createPerson,
    deletePerson,
    updatePerson
}
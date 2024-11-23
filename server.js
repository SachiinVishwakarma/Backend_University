//server.js
const express      = require('express'),
    Students = require('./dbFiles/student')
    dbOperation = require('./dbFiles/dbOperation')
    cors         = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get('/api/employees', async (req, res) => {
    const result = await dbOperation.getAllEmployees(); // Fetch all employees
    res.json(result.recordset);
  });

app.post('/api', async(req,res)=> {
    console.log('Called');
    const result =await dbOperation.getEmployees(req.body.name);
    res.send(result.recordset);
});

app.post('/quit', async(req,res)=> {
    await dbOperation.createEmployees(req.body);
    const result =await dbOperation.getEmployees(req.body.Name);
    console.log('Called quit');
    res.send(result.recordset)
});
app.post('/delete', async(req,res)=> {
    const result =await dbOperation.deleteEmployees(req.body.ID);
    console.log('Called delete');
    res.json({ message: 'Deleted successfully' });  
    res.send(result.recordset)
});
app.post('/update', async (req, res) => {
    const result =await dbOperation.updateEmployee(req.body);
    console.log('Called delete');
    res.json({ message: 'Update successfully' });  
    res.send(result.recordset)
    
});
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
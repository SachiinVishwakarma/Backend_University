const express      = require('express'),
     dbOperation = require('./Assignment/dbOperations')
      cors         = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/getPerson', async (req, res) => {
    const result = await dbOperation.getAllPerson();
    res.json(result.recordset);
});
app.post('/api/createPerson', async (req, res) => {
    console.log('Request Body:', req.body); // Debug incoming data

    try {
        const result = await dbOperation.createPerson(req.body);
        res.status(201).send({ success: true, message: 'Person created successfully', result });
    } catch (error) {
        console.error('Error in /api/createPerson:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error', error });
    }
    console.log(req.body)
});
app.post('/api/deletePerson',async (req,res)=>{
    const result= await dbOperation.deletePerson(req.body.ID);
})

app.post('/api/updatePerson', async (req, res) => {
    const result =await dbOperation.updatePerson(req.body);
    res.json({ message: 'Update successfully' });  
    
});
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
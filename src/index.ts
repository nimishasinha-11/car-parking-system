import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/test', (req,res) =>{
    res.json({message: 'test api!'});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
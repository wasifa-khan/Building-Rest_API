const express = require('express');
const fs = require('fs')
const users = require('./MOCK_DATA.json')
const app = express();
const port = 8000;

//Middleware-Plugin
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
})
app.get('/users', (req, res) =>{
    const html = `<ul>${users.map(user=>`<li>${user.first_name}</li>`).join("")}</ul>`;
    res.send(html)
})
app.get('/api/users/:id', (req, res) =>{
     const id = Number(req.params.id);
     const user = users.find(user => user.id === id);
     return res.json(user);
})
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.json({status : "success", id: users.length});
    })
    
})
app.patch('/api/users/:id', (req, res) => {
    return res.json({status : "pending"})
;
})
app.delete('/api/users/:id', (req, res) => {
    return res.json({status : "pending"})
;
})
app.listen(port, () => console.log(`Server started at port:${port}`)
);

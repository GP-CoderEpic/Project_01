require('dotenv').config()
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const Port = 5000;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) =>{
    console.log("Hello from middleware 1");
    next();
});

app.use((req, res, next) =>{
    next();
});

app.get("/users", (req, res) =>{
    const html = `
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    `;
    res.send(html);
});

app.get("/api/users", (req, res) =>{
    console.log(req.headers);
    return res.json(users);
});

app.route("/api/users/:id").get( (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) =>{
    return res.json({status: "Pending"});
}).delete((req, res) => {
    return res.json({status: "Pending"});
});

// app.post("/api/users", (req, res) => {
//     const body = req.body;
//     if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
//         return res.status(400).json({ msg: 'All fields are required.' });
//     }
//     const newUser = { ...body, id: users.length + 1 };
//     users.push(newUser);
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ msg: 'Error writing to file.' });
//         }
//         return res.json({ status: "success", id: newUser.id });
//     });
// });

app.post("/api/users", (req, res) =>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: 'All fields are req..'});
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status: "success", id: users.length});
    });
    
});

app.listen(process.env.PORT, ()=> console.log("Server Started"));
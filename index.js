const express = require("express");
const qr = require("qr-image");

const app = express();  

const users = [
    {id: "f5df118d-7d2d-47c4-b21b-d9dde70cd670", nome: "Juarez"},
    {id: "ab07f7ca-14f8-4960-a444-0279199ce450", nome: "Yuri"},
    {id: "5c141993-7299-4d0a-81f6-9ea58c96316e", nome: "Cris"},
    {id: "e3846eea-7234-45fa-bc63-08d55a28791e", nome: "Dani"}
]

app.get('/qr-code/:id', (req, res) => {
    
    const {id} = req.params;
    const uuidUser = users.find((user) => user.id === id);
    console.log(uuidUser) 

    var code = qr.image( uuidUser.id, { type: 'png' });

    res.type('png');
    code.pipe(res);
});

app.get('/colaborador/:id', (req, res) => {
    
    const {id} = req.params;
    const user = users.find((user) => user.id === id);

    return res.send(`
    <p>${user.nome}</p>
    <img src="/qr-code/${user.id}" />
    <style>
      @media print {
        button {
          visibility: hidden;
        }
      }
    </style>
  `)

});
app.listen(3000, () => {
    console.log("server running");
});
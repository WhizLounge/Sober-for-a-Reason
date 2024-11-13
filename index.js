import express from "express";

const app = express();
const port = 4000;
//add a new client
app.use(express.json());

let clientData = [];
let nextId = 1;

app.post("/clients", (req, res) => {
  const { name, age } = req.body;
  const newClient = { id: nextId++, name, age };
  clientData.push(newClient);
  res.status(201).send(newClient);
});

//get all clients
app.get("/clients", (req, res) => {
  res.status(200).send(clientData);
});
  
//get client with id
app.get("/clients/:id", (req, res) => {
  const client = clientData.find((c) => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).send("I couldn't find it!");
  }
  res.status(200).send(client);
});

//update client
app.put("/clients/:id", (req, res) => {
  const client = clientData.find((c) => c.id === parseInt(req.paramsid));

  if (!client) {
    return res.status(404).send("I couldn't find it the client!");
  }
  const { name, age } = req.body;
  client.name = name;
  client.age = age;
  res.send(200).send(client);
});

//delete client
app.delete("/clients/:id", (req, res) => {
  const index = clientData.findIndex((c) => c.id === parseInt(req.params));
  if (index === -1) {
    return res.status(404).send("client not found!");
  }
  clientData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});

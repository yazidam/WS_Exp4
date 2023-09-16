const express = require("express");
const app = express();
app.use(express.json());

const users = [
  { id: "0", name: "ahmed", age: "25" },
  { id: "1", name: "zied", age: "20" },
  { id: "2", name: "dhia", age: "28" },
];

app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === id);
  res.send(user);
});

app.post("/users/add", (req, res) => {
  const userInfo = req.body;
  const id = userInfo.id;
  const userExist = users.find((el) => el.id === id);
  if (userExist) return res.status(403).json({ msg: "user exist" });
  else {
    users.push(userInfo);
    res.status(200);
    res.send({ msg: "uses add", users });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userExist = users.find((el) => el.id === id);
  if (userExist) {
    const userList = users.filter((el) => el.id !== id);
    delete users[id];
    res.send({ msg: "uses deleted", users });
  } else {
    res.status(404);
    res.send({ msg: "uses not found" });
  }
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updateduser = req.body;
  const userIndex = users.findIndex((el) => el.id === id);
  console.log("userIndex", userIndex);
  if (userIndex === -1) {
    res.status(404);
    res.send({ msg: "uses not found" });
  } else {
    users[userIndex] = {
      ...users[userIndex],
      ...updateduser,
    };
    res.status(200);
    res.send({ msg: "uses updated", updateduser: users[userIndex] });
  }
});

const port = 4000;
app.listen(port, () => console.log(`server run on ${port}`));

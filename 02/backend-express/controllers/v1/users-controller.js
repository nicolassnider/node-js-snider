const users = require("../../utils/users.json");
const usersData = users.data;

const getUsers = (req, res) => {
  res.send(users);
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.userId);
  const index = usersData.findIndex((item) => item.id == userId);
  if (index !== -1) {
    res.send({ data: usersData[index] });
  } else {
    res.status(404).send({});
  }
};
module.exports = { getUsers, getUserById };

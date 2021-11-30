"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('../../utils/users.json');
const users_1 = require("../../data/users");
const getUsers = (req, res) => {
    res.send(users);
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = users_1.usersData.findIndex((item) => item.id == userId);
    if (index !== -1) {
        res.send({ data: users_1.usersData[index] });
    }
    else {
        res.status(404).send({});
    }
};
exports.getUserById = getUserById;

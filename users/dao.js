import model from './model.js';

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find()
export const findUserById = (userid) => model.findById(userid);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

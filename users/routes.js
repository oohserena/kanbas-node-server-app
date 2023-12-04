import * as dao from "./dao.js";
import session from "express-session";

// let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => { 
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => { 
    console.log(req.params.userId)
    const currentUser = await dao.findUserById(req.params.userId);
    // console.log(currentUser)
    res.json(currentUser)
  };
  const updateUser = async (req, res) => {
    console.log('in update user', req.params)
    const id = req.params.userId;
    const newUser = req.body;
    console.log('newUser', newUser, id)
    const status = await dao.updateUser(id, newUser);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };


  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['curentUser'] = currentUser;
  
    if (currentUser) {
      res.json(currentUser._id);
    } else {
      // Handle the case where no user is found for the given credentials.
      res.status(401).json({ error: 'Invalid credentials' });
    }
  };

  const signout = (req, res) => {
    req.session.destroy()
    res.json(200);
  };

  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;


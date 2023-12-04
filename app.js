
import "dotenv/config";
import express from 'express';
import Hello from './hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import mongoose from 'mongoose';
// mongoose.connect('mongodb://127.0.0.1:27017/kanbas');
import UserRoutes from './users/routes.js';
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(cors({
    credentials: true,
    origin: 'https://a6--kanbas-not-canvas-1214.netlify.app'
    // origin: 'https://localhost:3000'
}
));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
      

// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
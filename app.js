import express from 'express';
import Hello from './hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';

const app = express();
app.use(cors());

// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
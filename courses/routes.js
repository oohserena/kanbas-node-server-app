import Database from "../Database/index.js";

function CourseRoutes(app) {
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id.toString() === id);
        if (course) {
          res.send(course);
        } else {
          res.status(404).send("Course not found");
        }
      });

    
    
      
    
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses
            .filter((c) => c._id.toString() !== id);
        res.sendStatus(204);
    });
    
    
    

    app.post("/api/courses", (req, res) => {
        const course = { 
            ...req.body,
            _id:new Date().getTime().toString() 
        };
        Database.courses.push(course);
        res.send(course);
    });

    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}

export default CourseRoutes;
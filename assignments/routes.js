import db from "../Database/index.js";

function AssignmentRoutes(app) {

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        console.log(`Received assignment creation request for course ${cid}`);
        
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
    
        db.assignments.push(newAssignment);
        console.log("New assignment added:", newAssignment);
    
        res.send(newAssignment);
    });
    
      
  
    

    app.get("/api/assignments/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
}

export default AssignmentRoutes;
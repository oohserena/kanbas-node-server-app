import db from "../Database/index.js";

function ModuleRoutes(app) {
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const updatedModule = req.body;
    
        // Find the index of the module in the database
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    
        if (moduleIndex !== -1) {
          // Update the module with the new values
          db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...updatedModule };
    
          res.sendStatus(200);
        } else {
          // If module not found, send a 404 status
          res.status(404).send("Module not found");
        }
      });

      
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
      });
    
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
        });
    
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules
        .filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;
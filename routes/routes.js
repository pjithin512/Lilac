
var taskcontroller = require('../controllers/TasksController.js');

module.exports=function(app){
   app.post('/task/addtask', taskcontroller.addtask);  
   app.post('/task/deletetask', taskcontroller.deletetask);  
   app.post('/task/completetask', taskcontroller.completetask);  
   app.post ('/task/updatetask', taskcontroller.updatetask);  
   app.get('/task/getalltask', taskcontroller.getalltask);  
}

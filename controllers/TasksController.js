
const { MongoClient } = require("mongodb");


const url = "mongodb+srv://pjithin512:9746911668@cluster0.hhz6j.mongodb.net/todo_db?retryWrites=true&w=majority"

const client = new MongoClient(url);


const dbName = "todo_db";

exports.addtask=async function(req,res){
   try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const col = db.collection("tasks");

      var input = req.body;

      var task_id =0;
      if(input.task_name!=undefined && input.task_name!=""){
       col.find({}).sort( { task_id: -1 } ).limit(1).toArray(function(err, docs) {

         docs.forEach(function(doc) {
           task_id = parseInt(doc.task_id)+1;
            taskDetails = {
            "task_id":task_id,
            "task_name": input.task_name,
            "task_description":input.task_description,
            "task_date": input.task_date,                                                                                                                            
            "task_status": input.task_status,                                                                                                                            
            "created_at": new Date(),                                                                                                                              
  
        };
        col.insertOne(taskDetails,function() {
         res.end( '[{"status":true,"message":"Task Added successfully."}]');
        });
         });
     
     });
   }
   else{
      res.end( '[{"status":false,"message":"Task name required."}]');
   }
     
      const myDoc = await col.findOne();

     } catch (err) {
      console.log(err.stack);
      res.end( '[{"status":false,"message":"Something wrong"}]');

  }

  finally {
     await client.close();
 }
}

exports.deletetask=async function(req,res){

   try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const col = db.collection("tasks");

      var input = req.body;

      if(input.task_id!=undefined&& input.task_id!=""){
       col.deleteOne({ task_id: input.task_id },function () {
         res.end( '[{"status":true,"message":"Task Deleted successfully."}]');
         
       });    
      }
      else{
         res.end( '[{"status":false,"message":"Task id required."}]');

      }
     
     

      const myDoc = await col.findOne();
     } catch (err) {
      console.log(err.stack);
      res.end( '[{"status":false,"message":"Something wrong"}]');
  }

  finally {
     await client.close();
 }
}

exports.completetask=async function(req,res){

   try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const col = db.collection("tasks");
      var input = req.body;
      if(input.task_id!=undefined&& input.task_id!=""){
      col.find({task_id:input.task_id}).toArray(function(err, docs) {

         docs.forEach(function(doc) {
            taskDetails = {
               "task_id":doc.task_id,
               "task_name":doc.task_name,
               "task_description":doc.task_description,
               "task_date": doc.task_date,                                                                                                                            
               "task_status": "Completed",                                                                                                                            
               "created_at": doc.created_at,                                                                                                                              
               "completed_at": new Date()                                                                                                                          
     
           };
           col.updateOne({ task_id: input.task_id},{$set: taskDetails},function () {
            res.end( '[{"status":true,"message":"Task Completed successfully."}]');
            
          });
         });
      });
   }
   else{
      res.end( '[{"status":false,"message":"Task id required."}]');

   }
     
     

      const myDoc = await col.findOne();
     } catch (err) {
      console.log(err.stack);
      res.end( '[{"status":false,"message":"Something wrong"}]');

  }

  finally {
     await client.close();
 }
}

exports.updatetask=async function(req,res){

   try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const col = db.collection("tasks");
      var input = req.body;
      if(input.task_id!=undefined&& input.task_id!=""){
      col.find({task_id:input.task_id}).toArray(function(err, docs) {

         docs.forEach(function(doc) {
            taskDetails = {
               "task_id":doc.task_id,
               "task_name":(doc.task_name==input.task_name)?doc.task_name:input.task_name,
               "task_description":(doc.task_description==input.task_description)?doc.task_description:input.task_description,
               "task_date": (doc.task_date==input.task_date)?doc.task_date:input.task_date,                                                                                                                            
               "task_status":(doc.task_status==input.task_status)?doc.task_status:input.task_status
           };
           col.updateOne({ task_id: input.task_id},{$set: taskDetails},function () {
            res.end( '[{"status":true,"message":"Task Updated successfully."}]');
            
          });
         });
      });

   }
   else{
      res.end( '[{"status":false,"message":"Task id required."}]');

   }
     
     

      const myDoc = await col.findOne();
     } catch (err) {
      console.log(err.stack);
      res.end( '[{"status":false,"message":"Something wrong"}]');

  }

  finally {
     await client.close();
 }
    
}

exports.getalltask=async function(req,res){
   try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const col = db.collection("tasks");

      col.find().toArray(function(err, out_data) {
         res.end( '[{"status":true,"message":"Task listing successfully.","Result" : '+JSON.stringify(out_data)+'}]');
      });
     
     

      const myDoc = await col.findOne();
     } catch (err) {
      console.log(err.stack);
      res.end( '[{"status":false,"message":"Something wrong"}]');

  }

  finally {
     await client.close();
 }
  
}

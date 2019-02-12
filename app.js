var express = require('express');
var fs = require('fs');
var app = express();


app.get('/',function(req,res){
	
	return res.redirect('/public/home.html');

});

app.use('/public', express.static(__dirname + '/public'));

/** Implementing Simple Music Server using Express JS **/
app.get('/music', function(req,res){
	// File to be served
	
	var fileId = req.query.id; 
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	
	});
	
});
app.get('/download', function(req,res){
	//here we pass in the id of the song as a query
	var fileId = req.query.id;
	//here we created a variable file and set the value to be the file name (the path name)
	var file = __dirname + '/music/' + fileId;

	//here we use fs to check if the file exist in the location
	fs.exists(file,function(exists){
		if(exists)
		{
			//if the file exist we use setheader to set the file name and also to set the content type
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			// we create a variable and we set the value to the return of createReadStream() method 
			//that takes in file variable as parameter
			var rstream = fs.createReadStream(file);
			//here we push the return value into the response. 
			rstream.pipe(res);
			res.statusCode(200);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
	
	
});


app.listen(3003,function(){
	console.log('App listening on port 3003!');
});
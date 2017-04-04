'use strict';
// global
var date = new Date();
var nextPostID = 0;

var MongoClient = require('mongodb'); //.MongoClient;

MongoClient.connect("mongodb://localhost:27017/testDB", function(err, db) {
	if(!err)
	{
		console.log("We are connected.");
		var collection = db.collection("example");
		// var doc = { name : 'Evan'};
		// collection.insert(doc);
		collection.find({"name" : "Evan"}).forEach(function(obj)
			{
				console.log(obj._id)
			})
	}
	else
	{
		console.log("Connection Failure.");
	}
})



function error(string) {
	alert("Error: " + string);
	console.log("Error: " + string);
}

// returns unique post ID
function generatePostID() {
	var postID = nextPostID;
	nextPostID += 1;
	return nextPostID;
}

function createNewPost()
{
	var text = window.prompt("Enter a post.", "");
	var trueOrFalse;
	var post;
	
	//This is a really crufty way of doing "T/F boolean values. 
	//If the user presses ok on the confirm thing, it won't err out and 
	//return true, otherwise it will err out in which case we assign false. 
	try
	{
		trueOrFalse = confirm("True?");
	}
	catch(err) 
	{
		trueOrFalse = false;
	}
	
	post = new Post(text, trueOrFalse)
	post.setColor();
}


class Post {
	constructor(text, tf) {
		this.text = text;
		this.tf = tf;
		this.timestamp = date.getTime();
		this.postID = generatePostID();
		this.responses = {};
		this.num_truth = 0;
		this.num_false = 0;
		this.color = "black";
	}

	addResponse(userID, response) {
		if (response) this.num_truth += 1;
		if (!response) this.num_false += 1;
		this.responses[userID] = response;
	}

	truthRate() {
		return this.num_truth/(this.num_truth + this.num_false);
	}
	setColor(tf)
	{
		if(tf) this.color = "blue";
		else this.color = "red";
	}
}

class User {
	constructor(userID, password, email) {
		this.userID = userID;
		this.password = password;
		this.email = email;
		this.num_tricked = 0;
		this.posts = new Map();
		this.reactedPosts = new Map();
	}

	addPost (post) {
		this.posts.set(post.postID,post);
	}

	getPost (postID) {
		return this.posts.get(postID);
	}

	getPostIDs() {
		return this.posts.keys();
	}

	respondToPost(post, tf) {
		this.reactedPosts.set(post,tf); 
	}

	setUserID(userID) {
		this.userID = userID;
	}

	getUserID() {
		return this.userID;
	}

	setPassword(password) {
		this.password = password;
	}

	getPassword() {
		return this.password;
	}

	setNumTricked (num) {
		this.posts.num_tricked = num;
	}

	getNumTricked() {
		return this.posts.num_tricked;
	}

}

var user1 = new User("bhans", "11462", "brhansen3@wisc.edu");
user1.addPost (new Post("hello I am Tim", false));


//Implement Board Class here. 	
	//Move to Board Class when we have one. 

	// addPost()
	// {
	// 	var table = document.getElementById("main_table");
	// 	var rowCount = table.rows.length;
	// 	var newRow = table.insertRow(rowCount);
	// 	newRow.id = "main_table_row_" + rowCount;
	// 	var newCell = newRow.insertCell(0);
	// 	newCell.innerHTML = newCell.innerHTML + '<hr><p>' + this.text + '</p>';
	// 	if(this.tf == true) document.getElementById(newRow.id).style.color = "blue";
	// 	else document.getElementById(newRow.id).style.color = "red";
	// }	



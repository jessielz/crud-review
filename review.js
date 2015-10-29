// Initialize Parse app.
Parse.initialize("UHSMBYE4dIvawri1wYJr0TcOI2CCnz4113TgEGBU", "eQZlIILQ5m9qg4xbrpqKPfdAGbYhHjFSUwQzddXZ")

var Review = Parse.Object.extend('Review')

$('form').submit(function() {

	var review = new Review()

	$(this).find("input").each(function() {
		instance.set($(this).attr('id'), $(this).val())
		$(this).val(' ')
	})
	
	// var myTitle = $("#title").val()
	// var myBody = $("#body").val()
	// var myRating = $("#rating").val()

	// // set (property, value)
	// review.set('title', myTitle)
	// review.set('body', myBody)
	// review.set('rating', myRating)
	console.log('test')
	console.log(review.get('title'))
	// console.log(myBody)
	// console.log(myRating)
	// console.log(review)

	review.save(null, {
		success: getData // after review is saved
	})
	// getData // doesn't wait for it to save
	return false
}

// fetches all data 
var getData = function() {
	var query = new Parse.Query(Review)
	query.find({
		success: function(results) {
			buildList(results)
		}
	})
}

var buildList = function(data) {
	$('#list').remove()
	data.forEach(function(d){
		addItem(d)
	})
}

var addItem = function(item) {
	var title = item.get("title")
	var body = item.get("body")
	var rating = item.get("rating")

	$('ol').raty();
}

//$(document).ready(function(){
	getData()
//})



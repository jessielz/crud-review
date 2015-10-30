$(document).ready(function(){

	// creates stars
	var rating = $('#rating').raty({ 
		half: true
	});	

	// creates average star rating
	var avg = $('#average').raty({
		readOnly: true,
		noRatedMsg: "Average rating"
	})

	// Initialize Parse app.
	Parse.initialize("UHSMBYE4dIvawri1wYJr0TcOI2CCnz4113TgEGBU","eQZlIILQ5m9qg4xbrpqKPfdAGbYhHjFSUwQzddXZ")

	var Review = Parse.Object.extend('Review')

	var totalReviews; // total number of reviews
	var totalStars; // total number of stars

	$('form').submit(function() {
		// creates a new instance of review
		var review = new Review()

		// sets the property for the title of the review
		// and then clears the title afterwards
		var title = $('#title').val();
		review.set('title', title);
		$('#title').val(' ')

		// sets the property for the text area (body of review)
		// and then clears the body afterwards
		var body = $('#body').val();
		review.set('body', body);
		$('#body').val(' ')

		// sets the property for the star rating system
		// and then clears the star rating system afterwards
		var rating = $('#rating').raty('score');
		review.set('rating', parseInt(rating));
		$('#rating').raty({score: 0})

		// saves the review (title, body, and rating) to Parse database
		review.save(null, {
			success: getData
		})

		return false
	})

	// gets data from Parse
	var getData = function() {
		var query = new Parse.Query(Review)
		query.notEqualTo('title', '')
		query.find({
			success:function(results) {
				buildList(results)
			}
		})
	}

	// builds the list of reviews
	var buildList = function(data) {
		$('#list').empty()
		totalStars = 0;
		totalReviews = 0;
		data.forEach(function(d){
			totalStars += d.get("rating");
			totalReviews++
			addItem(d)
		})
	}

	// adds the list of reviews to the page
	var addItem = function(item) {
		var title = item.get("title") // title of the review
		var body = item.get("body") // body of the review (review itself)
		var rating = item.get("rating") // rating of the item
		avg = $('#average').raty({
			readOnly: true,
			score: Number(totalStars) / Number(totalReviews)
		})
		// construct a review
		var addReview = $('<div><div class = "stars"></div><h3>' + title + '</h3><strong>Rating: ' + rating + '</strong> | <span>' + body + '</span></div>')
		$('.stars').raty({
			readOnly: true,
			score: rating
		})

		// creates a button with a <span>element (using bootstrap class to show the X)
		var button = $('<button class = "btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')
		
		// click function on the button to destroy the item and then recall getData
		button.click(function(){
			item.destroy({
				success: getData
			})
		})

		addReview.append(button)
		$('#list').append(addReview)
		// $('#list').append(addReview)
	}
	getData()
})
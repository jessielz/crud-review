$(document).ready(function(){

	// creates stars
	var currentStar = $('#star').raty({ 
		half: true,
		targetKeep: true,
		targetType: 'score',
		targetFormat: 'ol'
	});

	// counts the total number of stars (initially 0) 
	var total = 0;

	// counts the number of reviews submitted (initially 0)
	var reviews = 0;

	// Initialize Parse app.
	Parse.initialize("UHSMBYE4dIvawri1wYJr0TcOI2CCnz4113TgEGBU","eQZlIILQ5m9qg4xbrpqKPfdAGbYhHjFSUwQzddXZ")

	var Review = Parse.Object.extend('Review')

	$('form').submit(function() {
		// creates a new instance of review
		var review = new Review()

		// sets the property for the title of the review
		// and then clears the title afterwards
		$(this).find('input').each(function() {
			review.set($(this).attr('id'), $(this).val())
			$(this).val(' ')
		})

		// sets the property for the text area (body of review)
		// and then clears the body afterwards
		var body = $('#body').val();
		review.set('body', body);
		$('#body').val(' ')

		// sets the property for the star rating system
		// and then clears the star rating system afterwards
		var rating = $('#star').raty('score');
		review.set('rating', parseInt(rating))
		$('#star').raty('score', 0)

		// saves the review (title, body, and rating) to Parse database
		review.save(null, {
			success: getData
		})

		return false
	})

	// gets data
	var getData = function() {
		var query = new Parse.Query(Review)
		query.notEqualTo('star', '')
		query.find({
			success:function(results) {
				buildList(results)
			}
		})
	}

	var buildList = function(data) {
		$('#list').empty()
		data.forEach(function(d){
			total += d.get("rating")
			addItem(d)
		})
		reviews = data.length
	}

	var addItem = function(item) {
		var title = item.get("title") // title of the review
		var body = item.get("body") // body of the review (review itself)
		var rating = item.get("star") // rating of the item
		total += rating

		$('star').raty({
			readOnly: true
			score: total / reviews
		})
	}

	getData()
})
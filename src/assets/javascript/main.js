// jQuery wrapper
(function ($, window, document) {
	var $state = {
		selectedSubItem: [],
		topMenu: [
			// {
			// 	category: "Breakfast",
			// 	subDrawer: [
			// 		{
			// 			subCategory: "Egg Souflee",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$12.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Breakfast Sandwich",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$9.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Croque Madame",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$14.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Moons Over My-Hammi",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$17.99",
			// 				}
			// 			]
			// 		},
			// 	]
			// },
			// {
			// 	category: "Lunch",
			// 	subDrawer: [
			// 		{
			// 			subCategory: "Alaskan Cheeseburger",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$12.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Teriyaki Bowl",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$11.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Chicken Ceasar Wrap",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$14.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Salmon Cobb Salad",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$24.99",
			// 				}
			// 			]
			// 		},
			// 	]
			// },
			// {
			// 	category: "Dinner",
			// 	subDrawer: [
			// 		{
			// 			subCategory: "Enchiladas Verde",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$14.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Alaskan Poke Bowl",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$17.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Asian Chicken Salad",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$19.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Wagyu Beef Sirloin",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$34.99",
			// 				}
			// 			]
			// 		},
			// 	]
			// },
			// {
			// 	category: "Beverages",
			// 	subDrawer: [
			// 		{
			// 			subCategory: "Coca-Cola (bottle)",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$3.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Alaskan Amber",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$9.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Milk (Plain/Chocolate)",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$4.99",
			// 				}
			// 			]
			// 		},
			// 		{
			// 			subCategory: "Sunkist Orange Juice",
			// 			choiceDrawer: [
			// 				{
			// 					price: "$4.99",
			// 				}
			// 			]
			// 		},
			// 	]
			// },

		
		]

	}



	$(function () {
		//Perform on page load
		$state.isLoading = true;
		doBind();
		fetchData();

	});

	
	//Other functions go here
	function doBind() {
		//binds $state object to the dashboard in html
		rivets.bind($("#dashboard"), { state: $state });
	};
	
	function fetchData() {
		$.get( "http://qudo-content.us-east-2.elasticbeanstalk.com/get/?a=3qqhea5jrfm05rj-b0f0e6c0-2295-11e9-9893-7b02cb112ce3", function(data) {
			$.each(data, function(){
				$state.topMenu.push(this);
			});
		});

		$state.isLoading = false;
	}

}) (jQuery, window, document);
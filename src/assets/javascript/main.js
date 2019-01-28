// jQuery wrapper
(function ($, window, document) {
	var $state = {
		selectedSubItem: [],
		topMenu: [

		]

	}



	$(function () {
		//Perform on page load
		//shows loader
		doBind();
		fetchData();

	});

	
	//Other functions go here
	function doBind() {
		//binds $state object to the dashboard in html
		rivets.bind($("#mainContainer"), { state: $state });
	};
	
	function fetchData() {
		//jQuery ajax call for data from Qudo Content via endpoint url
		$.get( "http://qudo-content.us-east-2.elasticbeanstalk.com/get/?a=3qqhea5jrfm05rj-b0f0e6c0-2295-11e9-9893-7b02cb112ce3", function(categoryData) {
			$.get("http://qudo-content.us-east-2.elasticbeanstalk.com/get/?a=3qqhea5jrfm35bu-04081c70-2296-11e9-9893-7b02cb112ce3", function(foodData) {
				matchFoodToCategory(categoryData, foodData);
			});
		});
	
		
	}

	function matchFoodToCategory(categories, food) {
		$.each(categories, function(){
			var thisCategory = this.category;
			var tempObj = {
				category: thisCategory,
				subDrawer: []
			};
			$.each(food, function(){
				if(thisCategory == this.category) {
					tempObj.subDrawer.push({	
						subCategory: this.name,
						details: {
							price: this.price,
							quantity: 1
						}				
					});
				}
			});
			$state.topMenu.push(tempObj);	
		});
		
		$("#mainContainer").removeClass("isloading");
	};

}) (jQuery, window, document);
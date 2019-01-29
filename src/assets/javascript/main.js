// jQuery wrapper
(function ($, window, document) {
	var $state = {
		totalPrice: "",
		cart: [],
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

	//click event for view menu button
	$("#cta").click(function () {
		// $(this).toggleClass("change");
		$(".home-screen__dashboard__drawer").addClass("drawer-active");
	});

	//click event for modal close button
	$("#close-button1").click(function () {
		// $(this).toggleClass("change");
		$(".home-screen__dashboard__drawer").removeClass("drawer-active");
	});

	//click event for modal close button
	$("#close-button2").click(function () {
		// $(this).toggleClass("change");
		$(".home-screen__dashboard").removeClass("sub-menu-active");
	});

	//click event for logo to return to home-screen
	$("#logo").click(function() {
		var topMenuOpen = $(".home-screen__dashboard__drawer").hasClass("drawer-active");
		var subMenuOpen = $(".home-screen__dashboard").hasClass("sub-menu-active");
		var cartOpen = $(".home-screen__dashboard__cart").hasClass("drawer-active");
		if(topMenuOpen) {
			$(".home-screen__dashboard__drawer").removeClass("drawer-active");
		};
		if(subMenuOpen) {
			$(".home-screen__dashboard").removeClass("sub-menu-active");
		};
		if(cartOpen) {
			$(".home-screen__dashboard__cart").removeClass("drawer-active");
		}
	});

	$("#cart-logo").click(function() {
		$(".home-screen__dashboard__cart").toggleClass("drawer-active");
	});

	$(document).on("click", ".home-screen__dashboard__drawer__item", function () {
		var thisIndex = $(this).data("index");
		handleSubmenu(thisIndex);
	});
	$(document).on("click", ".home-screen__dashboard__sub-drawer__item", function () {
		$(this).toggleClass("active");
	});

	$(document).on("click", "#add-btn", function() {
		var purchasedIndex = $(this).data("index");
		$state.cart.push($state.selectedSubItem[purchasedIndex]);
		console.log($state);
	});


	//Other functions go here
	function doBind() {
		//binds $state object to the dashboard in html
		rivets.bind($("#mainContainer"), { state: $state });
	};

	function fetchData() {
		//jQuery ajax call for data from Qudo Content via endpoint url
		$.get("http://qudo-content.us-east-2.elasticbeanstalk.com/get/?a=3qqhea5jrfm05rj-b0f0e6c0-2295-11e9-9893-7b02cb112ce3", function (categoryData) {
			$.get("http://qudo-content.us-east-2.elasticbeanstalk.com/get/?a=3qqhea5jrfm35bu-04081c70-2296-11e9-9893-7b02cb112ce3", function (foodData) {
				matchFoodToCategory(categoryData, foodData);
			});
		});
	};

	//Loops through aqcuired data and creates object with new properties including subDrawer for to build sub-menu
	function matchFoodToCategory(categories, food) {
		$.each(categories, function () {
			var thisCategory = this.category;
			var tempObj = {
				category: thisCategory,
				subDrawer: []
			};
			//loops through 2nd parameter and pushes new sub object and sub properties with corresponding values into temp array
			$.each(food, function () {
				if (thisCategory == this.category) {
					tempObj.subDrawer.push({
						subCategory: this.name,
						details: {
							price: this.price,
							quantity: 1
						}
					});
				};
			});
			$state.topMenu.push(tempObj);

		});

		$("#mainContainer").removeClass("isloading");
	};


	function handleSubmenu(index) {
		var selectedMenuItem = $state.topMenu[index];
		// var hasSubDrawer = selectedMenuItem.subDrawer ? true : false;
		var isOpen = $(".home-screen__dashboard").hasClass("sub-menu-active");
		if (isOpen) {
			$(".home-screen__dashboard").removeClass("sub-menu-active")
		} else {
			// if (hasSubDrawer) {
				$(".home-screen__dashboard").addClass("sub-menu-active");
				buildSubmenu(selectedMenuItem);
			// } else { 
				// alert("Going To: " + selectedMenuItem.url)
			// }
		}
		
	}
	function buildSubmenu(selectedMenuItem) {
		var selectedSubMenu = selectedMenuItem.subDrawer;
		while ($state.selectedSubItem.length > 0) {
			$state.selectedSubItem.pop();
		}
		for (var i = 0; i < selectedSubMenu.length; i++) {
			$state.selectedSubItem.push(selectedSubMenu[i]);
		}
	}

})(jQuery, window, document);
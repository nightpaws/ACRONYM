/**
 * Created by Tom on 02/01/2016.
 */

angular.module('fridges')
	.controller('fridges.view.controller', ['$scope', '$stateParams','fridges.request.factory', 'toastr', '$state',
		function($scope, $stateParams, requestHelper, toastr, $state) {

			$scope.fridge = {};

			$scope.graph = {
				data: {
					labels: [1,2],
					series: [
						[1,2]
					]
				},
				options: {
					fullWidth: true,
					lineSmooth: Chartist.Interpolation.none({
						fillHoles: true,
					}),
					showPoint: false,
					chartPadding: {
						top: 32,
						right: 40,
						bottom: 0,
						left: 0
					},
					axisY:{
						offset: 40
					},
					axisX: {
						labelOffset: {
							x: -15,
							y: 0
						}
					},
					low: 0,
					high: 10
				},
				responsiveOptions: []
			};

			$scope.goToProduct = function(id){

				$state.go('page.productsView', {id: id});

			};

			$scope.edit = function(){

				$state.go('page.fridgesEdit', {id: $scope.fridge.fridge_no})

			};

			requestHelper.get($stateParams.id)
				.then(function(data){

					if(data.data.successful){

						$scope.fridge = data.data.result;

						if($scope.fridge.name === undefined || $scope.fridge.name === ''){
							$scope.fridge.name = 'Unnamed Fridge - Number ' + $scope.fridge.fridge_no;
						}

						if($scope.fridge.description === undefined || $scope.fridge.description === ''){
							$scope.fridge.description = 'No Description Added'
						}

						$scope.fridge.state = $scope.fridge.states[$scope.fridge.states.length - 1];

						$scope.graph.data.series[0] = [];
						$scope.graph.data.labels = [];

						$scope.fridge.contents.forEach(function(content){

							if(content.product.name === undefined)
								content.product.name = 'Unnamed product';

							var date = new Date(content.date_added);

							content.readableDate = date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString();

						});



						//if we have states
						if($scope.fridge.states.length > 0){

							//Okay lets sort out the data to display it
							var _5mins = 1000 * 60 * 5;
							var day = 1000*60*60*24;
							var currentDate = new Date().getTime();
							var currentDateRounded = new Date( (currentDate / _5mins) * _5mins ); // to the nearest 5mins
							var i = 0;
							var low = 1000;     //lowest and highest temps
							var high = -1000;
							var lastDate = null; //the last date processed
							var nextDate = null; //the next date to process

							//and loop for states
							for(var a = 0; a < $scope.fridge.states.length; a++){

								var state = $scope.fridge.states[a];

								var date = new Date(state.date);

								//if its a new data point process otherwise ignore
								if((currentDate - date.getTime()) < day){

									//round the states date
									date = new Date(Math.ceil(date.getTime() / _5mins) * _5mins);

									//if we have a prediction of the next date then perform date check
									if(nextDate != null){

										//if date is old toss it
										if(date.getTime() < nextDate.getTime()){
											continue;
										}

										//While the current date is not the date we expect populate the dates in the
										// data series
										while(date.getTime() != nextDate.getTime()){

											var tempDate = new Date( lastDate.getTime() + ( i * _5mins) );
											var label = createLabel(tempDate);
											$scope.graph.data.series[0].push(null);
											$scope.graph.data.labels.push(label);
											nextDate = new Date(nextDate.getTime() + _5mins);

											++i;
										}

									}

									//got here? Okay now to add this states date

									lastDate = date;
									date = new Date( (date.getTime() / _5mins) * _5mins );

									//generate label and calc next date
									var label = createLabel(date);
									nextDate = new Date(date.getTime() + _5mins);

									//store high and low
									if(state.temperature < low) low = state.temperature;
									if(state.temperature > high) high = state.temperature;


									//add data to graph
									$scope.graph.data.series[0].push(state.temperature);
									$scope.graph.data.labels.push(label);

								}

							}

							//okay all states processed
							//now to take us to the current date

							//if we have data that wasn't pruned
							if(lastDate){
								//is the last date close enough to the present date if so we can skip this
								if(lastDate.getTime() < currentDateRounded.getTime() - 1000 * 60 ){

									//loop adding dates till we get to the present date
									while(lastDate.getTime() < currentDateRounded.getTime() - _5mins){

										lastDate = new Date(lastDate.getTime() + _5mins);
										var label = createLabel(lastDate);
										$scope.graph.data.series[0].push(null);
										$scope.graph.data.labels.push(label);
									}

								}

								//add margins to temperatures
								$scope.graph.options.low = low - 2;
								$scope.graph.options.high = high + 2;

								//next we need to work out what labels to show
								var number = $scope.graph.data.labels.length;
								var toShow = 6;
								if(number < toShow) toShow = number;
								var distance = Math.round( number / toShow);

								//okay now to create a style sheet to inject custom rules into
								$scope.sheet = (function() {
									var style = document.createElement("style");
									style.appendChild(document.createTextNode(""));
									document.head.appendChild(style);

									return style.sheet;
								})();

								//add the custome rules based on the above distances
								$scope.sheet.insertRule(".ct-labels foreignobject:nth-of-type(" + distance + "n+1) .ct-horizontal{ color: rgba(0,0,0,0.4) !important;}", 0);
								$scope.sheet.insertRule(".ct-grids .ct-horizontal:nth-of-type(" + distance + "n+1){ stroke: rgba(100,100,100,0.2) !important;}", 1);

								//and set up to destroy the rules on destruction of the scope/ away navigation
								$scope.$on('$destroy', function(){
									$scope.sheet.deleteRule(1);
									$scope.sheet.deleteRule(0);
								});
							}



						}



						//Check the lengths to see if we have data
						//this needs to be done after the above to ensure old dates are stripped
						//We will add some dummy info to stop chartist complaining
						//then hide the chart with a lovely message
						if($scope.graph.data.series[0].length === 0){
							$scope.graph.data.series[0] = [1,2];
							$scope.graph.data.labels = [1, 2];
							$scope.graph.noData = true;
						}else if($scope.graph.data.series[0].length === 1){
							$scope.graph.notEnoughData = true;
							$scope.graph.data.series[0] = [1,2];
							$scope.graph.data.labels = [1, 2];
						}else{
							$scope.graph.noData = false;
							$scope.graph.notEnoughData = false
						}

					}else{
						toastr.error(data.data.message, 'Error');
					}

				})
				.catch(function () {

					toastr.error('Couldn\'t reach server sorry about that', 'Error');

				});

			function createLabel(time){

				var hours = time.getHours(),
					mins = time.getMinutes();

				hours = (hours < 10) ? "0" +  hours : hours;
				mins = (mins < 10) ? "0" +  mins : mins;

				return hours+ ':' + mins;
			}

		}]);
//variables

//variables for top nav
const notifIndicator = document.getElementById('circle');
const bell = document.getElementById('bell');
const triangle = document.getElementById('triangle');
const notifDiv = document.getElementById('notif-dropdown');

//varibles for alert notification
const alertDiv = document.getElementById("alert");
const alertMessage = "You have unread notifications, don't forget to check them out!";

//variables for icon navigation

const icnNav = document.getElementById('icon-navigation');
const icnNavItems = icnNav.children[0].children;

//variables for user search forms/button

const userSearch = document.getElementById('user-search'); //user search input
const userMsg = document.getElementById('user-message');//user message input
const userSend = document.getElementById('send'); //send button
const userForm = document.getElementById('user-search-form'); //form element
const userList = document.getElementById('member-list').children;
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const confirm = document.getElementById('confirm');

//variables for settings toggles and timezone

//settings variables
const toggles = document.getElementsByClassName("toggle");
const switchText = document.getElementsByClassName('switch-text');

//timezone variables
const timeZoneSelect = document.getElementById('timezone-select');
const timeZones = timeZoneSelect.children;
let selectOption = timeZoneSelect.options[timeZoneSelect.selectedIndex];
let lastSelected = localStorage.getItem('timeZoneSelect');

//this array of objects stores all the user traffic data
let trafficData = [
    hourly = {
		time:['12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'],
		users:[45,70,55,90,100,120,80,60,110,130,95,150]
	},
    daily ={
		time:['Mon','Tues','Wed',"Thurs",'Fri','Sat','Sun'],
		users:[130,250,400,300,450,200,500]
	},
	weekly = {
		time:['Week 1','Week 2',"Week 3",'Week 4','Week 5','Week 6','Week 7','Week8'],
		users:[300,500,1250,1000,1500,1250,1400,1800]
	},
	monthly = {
		time:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		users:[2000,3500,3000,5000,5500,4500,3000,4000,6000,4500,2500,5000]
	}
];

//variables for charts
const chartButtonsUL = document.getElementById('date');
const chartButtons = chartButtonsUL.children;
let ctx1 = document.getElementById("traffic-general");

const lineChart = new Chart(ctx1, {
	type: 'line',
	data:{
		labels: trafficData[2].time,
		datasets:[{
			data:trafficData[2].users,
			backgroundColor:'rgba(115,119,191,0.3)',
			lineTension:0,
			pointStyle:'circle',
			borderColor:'rgb(115,119,191)',
			borderWidth:0.5
			
		}]
	},
	options:{
		legend:{
			display:false
		},
		maintainAspectRatio:false,
	}
});

let ctx2 = document.getElementById('traffic-daily');

const barChart = new Chart(ctx2, {
	type: 'bar',
	data:{
		labels: ['S','M','T','W','T','F','S'],
		datasets:[{
			data:trafficData[1].users,
			backgroundColor: 'rgb(115,119,191)'
		}]
	},
	options:{
		legend:{
			display:false
		},
	}
});

let ctx3 = document.getElementById('traffic-mobile');

const pieChart = new Chart(ctx3,{
	type: 'doughnut',
	data:{
		labels:['Phones','Tablets','Desktop'],
		datasets:[{
			data: [700,100,200],
			backgroundColor:['#7377BF','#81C98F','#74B1BF']
		}]
	},
	options:{
		legend:{
			position:'right',
			labels:{
				boxWidth:20,
				padding:20
			}
		},
	}
});

/////////////////////////////////////////////////////////
//functions

//function which creates alert messages
function createAlert(message){
	alertSpan = document.createElement("span");
	alertSpan.textContent = message;
	alertDiv.appendChild(alertSpan);
};

//creates a close button for the alert div
function createCloseButton(){
	alertClose = document.createElement('a') //create a link tag

	//give the button properties, like class and the 'x' look
	alertClose.className = "close-button";
	alertClose.innerHTML = "&times";
	alertClose.setAttribute('href', "#")

	//add event listener so it removes the alert div when clicked
	alertClose.addEventListener("click",function(){
		alertDiv.parentNode.removeChild(alertDiv);
	});

	alertDiv.appendChild(alertClose); //append to the alert div
};

///////////////////////////////////////////////////////////////////////////////
//code

//changes the bell color indicator to green when bell is clicked
bell.addEventListener('click',function(){
	if(notifIndicator.style.backgroundColor = '#d22a1e'){
		notifIndicator.style.backgroundColor = 'lime';
	}
	if(notifDiv.style.display == 'none'){
		notifDiv.style.display = 'block';
	}else{
		notifDiv.style.display = "none";
	}
});

//adds an event listener to icn navigation so the selected item has a border
for(i=0 ; i<icnNavItems.length ; i++){
	icnNavItems[i].addEventListener('click',function(){
		const icnNavItems = icnNav.children[0].children;
		//first removes all elements with the selected class
		for(i=0 ; i<icnNavItems.length ; i++){
			icnNavItems[i].className="";
		}
		//then gives the clicked element the selected class
		this.className="selected";
	});
}

//Next 3 lines create the alert message and the close button using functions above
createAlert("Alert")
createAlert(alertMessage);
createCloseButton();

//adds event listener to the date buttons so they display the proper information when clicked
for(i=0 ; i<trafficData.length ; i++){
	if(trafficData[i]){
		(function(i){
			chartButtons[i].addEventListener('click',function(){
				//changes the x scale  and y traffic numbers
				lineChart.config.data.datasets[0].data = trafficData[i].users;
				lineChart.config.data.labels = trafficData[i].time;

				lineChart.update(0); //updates the chart with the new info

			});
		})(i);
	};
};

//checks to make sure a valid user and a message is present, gives error if not
userSend.addEventListener('click',function(){
	let userArr = []; 
	let validUser;
	let textPresent;
	//puts users into an array
	for(i=0 ; i<userList.length ; i++){
		const currentUser = userList[i].value;
		userArr.push(currentUser);
	}
	//empties the error h4's
		error1.textContent="";
		error2.textContent="";
		confirm.textContent="";

	//check if user is valid
	if(userArr.indexOf(userSearch.value,0) == -1){
		error1.textContent = "That is not a valid user!";
		validUser=false;
	}else{
		validUser = true;
	}
	//check if text is present
	if(userMsg.value == ""){
		error2.textContent = "There is no message!";
		textPresent=false;
	}else{
		textPresent = true;
	}

	if(validUser == true && textPresent == true){
		confirm.textContent = "Message was sent!";
		validUser= false;
		textPresent = false;
	}
	userForm.reset(); //resets the user search form when the send button is clicked
});


//this for loop loops through the 2 toggle switches
//first it checkes local storage and sets the toggles to the correct state upon page loading
//then it adds an event listener to switch the state of the toggle when it's clicked
for(i=0; i<toggles.length; i++){
	const currentInput = toggles[i];
	//depending on what is saved in the local storage the toggle will be checked or not
	if(currentInput.className == "toggle toggle1" && localStorage.toggle1 == 'true'){
		currentInput.checked = true;
	}else if(currentInput.className == "toggle toggle2" && localStorage.toggle2 == 'true'){
		currentInput.checked = true;
	}

	//if the checked attribute is on the input it will switch it to the checked state
	if(currentInput.checked){
		const switchLabel = currentInput.parentNode;
		switchLabel.removeChild(switchLabel.lastElementChild);
		switchLabel.removeChild(switchLabel.lastElementChild);
		let createSpan = document.createElement('span');
		let createSpanSlider = document.createElement('span');
		createSpanSlider.className = "slider-round";
		createSpan.textContent = "ON";
		switchLabel.appendChild(createSpanSlider);
		switchLabel.appendChild(createSpan);
		switchLabel.style.backgroundColor = "#7377BF";
	}

	//event listener will change the state of the toggle depending on on the state of the checkbox

	//It works by using 2 span elements, the on/off text, and the circle shaped span
	//When the toggle switches states, I delete the spans and recreate them in reverse order
	//to simulate the effect, I also change the background color.
	currentInput.addEventListener('click',function(){
		//deleting existing spans
		let toggle = this.parentNode;
		toggle.removeChild(toggle.lastElementChild);
		toggle.removeChild(toggle.lastElementChild);

		//if the element is checked, it will create the checked layout for the toggle
		if(this.checked == true){
			let createSpan = document.createElement('span');
			let createSpanSlider = document.createElement('span');
			createSpanSlider.className = "slider-round";
			createSpan.textContent = "ON";
			toggle.appendChild(createSpanSlider);
			toggle.appendChild(createSpan);
			toggle.style.backgroundColor = "#7377BF";
			this.setAttribute('checked','');

			//saving stuff to local storage to save the state upon page reload
			if(this.className == 'toggle toggle1'){
				localStorage.setItem('toggle1',true);
				console.log(localStorage.toggle1);
			}else{
				localStorage.setItem('toggle2',true);
				console.log(localStorage.toggle2);
			}
			
		//if the element is unchecked it will create the unchecked layout for the toggle
		}else{
			let createSpan = document.createElement('span');
			let createSpanSlider = document.createElement('span');
			createSpanSlider.className = "slider-round";
			createSpan.textContent = "OFF"
			toggle.appendChild(createSpan);
			toggle.appendChild(createSpanSlider);
			toggle.style.backgroundColor = "grey";
			this.removeAttribute('checked','');

			//saving more localstorage stuff for the unchecked state
			if(this.className == 'toggle toggle1'){
				localStorage.setItem('toggle1',false);
				console.log(localStorage.toggle1);
			}else{
				localStorage.setItem('toggle2',false);
				console.log(localStorage.toggle2);
			}
		}
	});
}

//uses localstorage to store the selected timezone
if(lastSelected){
	timeZoneSelect.value = lastSelected;
}

timeZoneSelect.onchange = function(){
	lastSelected = timeZoneSelect.options[timeZoneSelect.selectedIndex].value;
	localStorage.setItem('timeZoneSelect',lastSelected);
}
var $ = jQuery;

function getLocation() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	getWeather(lat, lon);
	console.log(position);
}

function getWeather(lat, lon) {
	var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=673bab237441507f65ceb0cf5bbc899d';

	var  xhr = new XMLHttpRequest();

	xhr.open('GET', url, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var weather = JSON.parse(xhr.responseText);
			publishData(weather);
		}
	};
	xhr.send(null);
}

function publishData(weather) {
	console.log(weather);

	// push weather data to variables
	var lat = weather.coord.lat;
	var lon = weather.coord.lon;
	var descrip = weather.weather[0].description;
	var tempC = Math.round(((weather.main.temp) - 273.15));
	var tempF = Math.round((tempC) * (9/5) + 32);
	var name = weather.name;
	var icon = weather.weather[0].icon;
	var code = weather.weather[0].id;
	
	// push weather data to DOM
	$('#descrip').text(descrip);
	$('#city-name').text(name);
	$('#latlong').text(lat + ", " + lon);
	$('#temp').text(tempF + "°F");
	
	// assign icon urls to variables
	var rainy = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488422988/rainy_rkpmkr.svg';
	var sunny = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488422133/sunny_wn1men.svg';
	var cloudy = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488422988/cloudy_hkmtdc.svg';
	var stormy = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488517940/stormy_bolt_s7vi3s.svg';
	var snowy = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488517568/snowflake_white_xkt2ev.svg';
	var nighty = 'https://res.cloudinary.com/dg8jelqkd/image/upload/v1488597675/moony3_b6elei.svg';
	
	// determine icon and gradient to use
	if (icon == '02n' || icon == '02d' || icon == '03n' || icon == '03d' || icon == '04n' || icon == '04d' || icon == '50n' || icon == '50d') {
		console.log('CLOUDY');
		$('.icon-img').attr('src', cloudy);
	} else if (icon == '01d') {
		console.log('SUNNY');
		$('.icon-img').attr('src', sunny);
	} else if (icon == '01n') {
		console.log('NIGHTY');
		$('.icon-img').attr('src', nighty);
	} else if (icon == '09n' || icon == '09d' || icon == '10n' || icon == '10d') {
		console.log('RAINY');
		$('.icon-img').attr('src', rainy);
	} else if (icon == '11n' || icon == '11d') {
		console.log('STORMY');
		$('.icon-img').attr('src', stormy);
	} else if (icon == '13n' || icon == '13d') {
		console.log('SNOWY');
		$('.icon-img').attr('src', snowy);
	}
	
	// determine which gradient to use
	if (code == '500' || code == '501' || code == '502' || code == '503' || code == '504' || code == '511' || code == '520' || code == '521' || code == '522' || code == '530') {
		$('#container').addClass('rainy');
	} else if (code == '800' && weather.weather[0].icon.slice(2) === 'd') {
		$('#container').addClass('sunny');
	} else if (code == '800' && weather.weather[0].icon.slice(2) === 'n') {
		$('#container').addClass('nighty');
	} else if (code == '801' || code == '802' || code == '803' || code == '804') {
		$('#container').addClass('cloudy');
	} else if (code == '200' || code == '201' || code == '202' || code == '210' || code == '211' || code == '212' || code == '221' || code == '230' || code == '231' || code == '232') {
		$('#container').addClass('stormy');
	} else if (code == '600' || code == '601' || code == '602' || code == '611' || code == '612' || code == '615' || code == '616' || code == '620' || code == '621' || code == '622') {
		$('#container').addClass('snowy');
	} else {
		$('#container').addClass('cloudy');
	}
	
	// toggle between F and C
	var toggle = false;
	$('.checkbox input').click(function() {
		toggle = !toggle;
		if (toggle) {
			$('#temp').text(tempC + '°C');
		} else {
			$('#temp').text(tempF + '°F');
		}
	})
	
	// console logging for testing purposes
	console.log(lat);
	console.log(lon);
	console.log(descrip);
	console.log(tempF + "°F");
	console.log(name);
}

	getLocation();
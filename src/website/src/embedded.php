<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>System Architecture</h1>
		<h3>How is it all put together?</h3>
	</div>
	<div class="content-secondary">
		<nav id="nav">
			<ul>
				<li><a href="buildsystem.php">Build System</a></li>
				<li><a href="server.php">Server Architecture</a></li>
				<li><a href="client.php">Client Side Architecture</a></li>
				<li><a href="embedded.php">Embedded Architecture</a></li>
			</ul>
		</nav>
	</div>
	<div class="content-primary header-padding">
		<h2 class="text-center secondary">Embedded Architecture</h2>
		<p>The Embedded Architecture can be broken down into two sections - the Arduino Uno which is used to control the door sensor, temperature sensor and an LED indicating the door status and the Raspberry Pi which controls the output from the Arduino, the barcode scanner, the Wii Board and server communications.</p>
	</div>
	<div class="content-secondary header-padding">
		<h2 class="text-center secondary">Arduino Uno</h2>
		<p>
			The Arduino Uno was chosen due to it's simplicity as a microcontroller and its easy to use C based programming language and IDE. Although simple to learn and use it provides all of the functionality required to control the door sensor and temperature sensor. Using the dedicated IDE it was a breeze to deploy code to the Arduino with the built in serial monitor being very useful monitoring values during testing.
			</br></br>
			The temperature sensor is an Adafruit Waterproof Digital Temperature Sensor which utilises the Dallas 1-Wire protocol. This library removed the need to perform calculations to convert a voltage to a temperature as it returns an accurate temperature reading based on the digital signal from the sensor when connected to one of the Arduino's digital pins.
			</br></br>
			{{insert circuit diagram}}
			</br></br>
			The door sensor is made up from an Adafruit Magnetic Contact Switch. When the two magnetic contacts are touching, a current is flowing therefore we can detect a signal on a digital pin of the arduino which tells us the door is closed. When no signal is detected on the digital pin the door must be open. A LED is also attached to the arduino to monitor the door’s status.
			</br></br>
			{{insert circuit diagram}}
			</br></br>
			It was originally planned to connect the arduino to the Raspberry Pi via the GPIO pins but during the development process it was discovered that connecting the Arduino to the Pi via USB was significantly easier from both the hardware and software point of view: there is a small risk of damaging the hardware and using the libraries for handling Serial connections was much simpler.
		</p>
	</div>
	<div class="content-primary header-padding">
		<h2 class="text-center secondary">Raspberry Pi</h2>
		<p>
			The Raspberry Pi brings together all of the data from the three main hardware components in the system - the arduino, the barcode scanner and the Wii Board. Python was used to create a program to pull the data from these three very different components, merges it all together and send it off to the server. Python was chosen as it has a lot of support for libraries that allow the pi to communicate with these different pieces of hardware.
			</br></br>
			PySerial was used for reading the data from the Arduino's USB connection as a stream of bytes which are then interpreted as the values of the current temperature and door state.
			</br></br>
			PyBlueZ is a library that simplifies connecting to bluetooth devices which in this case was the Wii Board.
			</br></br>
			Requests was used to handle communication with the RESTful api.
			</br></br>
			The python evdev library allows for reading input events on linux such as keyboard input, mouse clicks and movement or even touch screen movement. In the case of this project the library was used to collect the input from the barcode scanner. The barcode scanner used in the project connects to the pi over usb and behaves like a keyboard so when a barcode is scanned the system interprets that as keyboard input and 'types' the barcode. Unfortunately it's not possible to rely on this method to retrieve barcode input therefore the evdev library can be used to return a series of "Key Down" events from the barcode scanner. Each keydown event will be a different number key. By piecing together the numbers in the order that the events are received, the barcode that was scanned can be created.	
		</p>
	</div>
</main>

<?php include ('footer.php'); ?>
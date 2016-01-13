<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>How to Contribute</h1>
		<h4>I want to join the fun!</h4>
	</div>
	<div class="content-secondary header-padding">
		<p>
			Fork and clone the github repository to a location on your chosen development machine. From here run the the build steps to set up the development environment. Each submodule can be developed without having to run through the whole build process. We recommend this approach. Once completed file a pull request on Github.
			</br></br>
			For working on the application server we recommend the use of Intellij and its NodeJs plugin. From here you can run the server alone without needing the rest of the application. You can utilise a tool such as Postman for Chrome to perform API calls. Or if you prefer run a local webserver hosting a build version of the SPA client, we recommend creating a system link in this case, linking ./build/public to your chosen www folder. In certain cases you may need to modify the HTML base tag in the client's index file, to reflect the base URL. 
			</br></br>
			For working on the SPA application we recommend you run the node server using node ./index.js from the build folder. From here the SPA client generates local builds in `./src/client/build` which you may which to system link to your chosen web servers www folder. In certain cases you may need to modify the HTML base tag in the client's index file, to reflect the base URL. 
			</br></br>
			We recommend the following pieces of hardware for developing the embedded system - 
			</br></br>
		</p>
			<ul>
			<li>Arduino Uno</li>
			<li>Raspberry Pi 2 Model B</li>
			<li>Nintendo Wii Fit Board</li>
			<li><a href="http://www.amazon.co.uk/TaoTronics%C2%AE-Barcode-Scanner-Handheld-Automatic/dp/B006LVO56W/ref=sr_1_1?ie=UTF8&qid=1452635107&sr=8-1-spons&keywords=taotronics+barcode+scanner&psc=1">TaoTronics USB Barcode Scanner</a></li>
			<li><a href="https://www.adafruit.com/products/381">Any USB barcode scanner that returns data back to the system as keyboard input will work with the system.</li>
			<li>Adafruit Digital Temperature Sensor</a></li>
			<li>Any DS18B20 digital temperature sensor will work with this system as they are compliant with the One Wire and Dallas Temperature libraries.</li>
			<li>ASUS Bluetooth Adapter</li>
			<li>Any USB bluetooth adapter that supports at least bluetooth 2.0 will work with the system.</li>
			<li>Magnetic Door Contacts</li>
			<li>Any magnetic contact switch will also work with the system.</li>
			</ul>
		<p>
			</br></br>
			For working on the Arduino code we recommend the use of the official Arduino IDE as it allows for easy deployment of the code to the Arduino as well as the serial monitor for  debugging during the development process. This allowed us to ensure that the correct data was being sent out across the serial connection to the Raspberry Pi.
			</br></br>
			For developing the Python code we recommend working within your preferred development environment and then deploying and running the code remotely via SSH and FTP. In our case we used Sublime Text 2 to write the code and then transferred it to the Pi using Filezilla. We used an ssh session to remotely access the Pi and run the code. It would also be possible to run the Raspbian GUI and work directly on the Pi. It is really down to personal preference.
		</p>
	</div>
</main>

<?php include ('footer.php'); ?>
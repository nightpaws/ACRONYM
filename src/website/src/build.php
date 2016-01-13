<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>How to Build</h1>
		<h4>I want to get my own!</h4>
	</div>
	<div class="panel-group" id="accordion">
		<div class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
		        Embedded System</a>
		      </h1>
		    </div>
		    <div id="collapse1" class="panel-collapse collapse in">
			    <div class="content-primary header-padding">
					<h2 class="text-center trinary">Arduino Uno</h2>
						<h3 class="secondary">Step One - Construct Arduino According to diagrams</h3>
						<p>Diagram can be found on the system arcitecture page.</p>
						
						<h3 class="secondary">Step Two - Get the Code</h3>

						<p>The code is hosted on <a href="https://github.com/nightpaws/Elite-Team-6">Github</a> Pull the code and then open the arduino project within the <a href="https://www.arduino.cc/en/Main/Software">Arduino IDE</a>.</p>

						<h3 class="secondary">Step Three - Upload code to Arduino</h3>

						<p>Using the IDE, upload the code to the Arduino.</p>

					<h2 class="text-center trinary">Raspberry Pi</h2>
						<h3 class="secondary">Step One - Install a fresh copy of Raspbian</h3>
						<h3 class="secondary">Step Two - Get the Code</h3>

						<p>The code is hosted on <a href="https://github.com/nightpaws/Elite-Team-6">Github</a>. Pull the code.</p>
						</br></br>
						<p>When the code runs it ensures that all dependencies are installed. If some packages are missing they will be automatically downloaded and installed therefore the program must be ran as the root user.</p>

						<h3 class="secondary">Step Three - Set the code to run on startup</h3>

					<h2 class="text-center trinary">Assembling the hardware</h2>
						<p>
							To assemble the hardware, the barcode scanner, Arduino, WiFi adapter and bluetooth adapter must be connected to the raspberry pi via USB. The temperature sensor should be placed inside the fridge and door sensor attached in a suitable place to detect the door state. They should both be connected to the arduino as shown in the diagram[link].
							</br></br>
							The fully assembled embedded system should be connected as it is in this diagram -
							</br></br>
							<img src="img/embedded_diagram.png">
						</p>
				</div>
			</div>
		</div>
		<div class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
		        Server Side</a>
		      </h1>
		    </div>
		    <div id="collapse2" class="panel-collapse collapse">
			    <div class="content-primary header-padding">
			    	<p>These instructions are for Linux systems, they can be adapted easily for Windows Systems as these were used for development. In the cases where scripts are ran .cmd scripts are provided, and should be up to date. The builds may fail on windows due to it not having particular libraries from MS Visual Studio. To solve this issue install MS Visual Studio and create a JS project installing all of the libraries it recommends.</p>
					<h3 class="secondary">Step 1 - Install prerequisites</h3>
						<p>
							This project requires that you install <a href="https://nodejs.org/en/download/">NodeJs</a>, <a href="https://www.mongodb.org/">MongoDB</a>, git and python 2.7+. Guides for doing this can be found at their respective sites.
						</p>
					<h3 class="secondary">Step 2 - Get the Code</h3>
						<p>
							The code is hosted on Github <a href="https://github.com/nightpaws/Elite-Team-6">Github</a>. Pull the code.
						</p>
					<h3 class="secondary">Step 3 - Run Prebuild.sh script</h3>
						<p>This script requires sudo access but only needs to be run once to configure the server for first time use in order to install global level components of the system.
						</br></br>
						Wait for Gulp and Bower, as well as a few local dependencies to be installed. This should only take a moment.
						</p>
						<p>
							> ./prebuild.sh
						</p>
					<h3 class="secondary">Step 4 - Run the Build Script</h3>
						<p>
							The build script was created to perform the individual build steps of each sub module. This will build the SPA client and the server and stick the result into a generated folder named “build” in the same directory.
						</p>
						<p>
							> ./build.sh
						</p>
					<h3 class="secondary">Step 5 - Generate or get the SSL certs required</h3>
						<p>
							We recommend use of Let's Encrypt for public certificates. The certificates used for the authentication should be different. You may place these files anywhere on your system although we recommend the default  ‘~/.ssh’ directory.
						</p>
					<h3 class="secondary">Step 6 - Drop in/edit your config to your liking</h3>
						<p>There are two configuration files in the project. These are the server configuration found at ‘build/config.js.’ This contains server specific config information and should be self explanatory.
						</br></br>
						The second is the SPA config which can be found at ‘./build/public/dashboard/app/config.js’ this just points to the API so ensure it points correctly.
						</p>
					<h3 class="secondary">Step 7 - Configure Startup</h3>
						<p>Run command Node index.js
						</br></br>
						Alternatively configure an autorun script, then add this to crontab to reload on restart. A sample is shown below
						</p>
						<p>
							#!/bin/sh

							if [ $(ps aux | grep $USER | grep node | grep -v grep | wc -l | tr -s "\n") -eq$
							then
							        export NODE_ENV=production
							        export PATH=/usr/local/bin:$PATH
							        cd
							        cd project1/Elite-Team-6/build
							        forever start index.js
							fi
						</p>
						<p>A sample crontab operation to execute this script is;</p>
						<p> @reboot ~/autorun.sh  >> /dev/null  2>&1</p>
						<p>We recommend you run the server behind a Nginx server, forwarding the relevant requests on. We also suggest you use forever or PM2 to manage the node process and run it as a service on the machine.</p>
				</div>
		    </div>
		</div>
	</div>
</main>

<?php include ('footer.php'); ?>
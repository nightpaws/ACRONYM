<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>System Architecture</h1>
		<h3>How is it all put together?</h3>
	</div>
	<div style="border-bottom: 1px solid black;" class="content-secondary header-padding">
		<p>The system is divided up into 6 major components, these are:</p>
		<ul>
			<li>The AngularJs SPA Client</li>
			<li>The NodeJs server code</li>
			<li>The embedded platform</li>
			<li>The embedded software</li>
			<li>The front facing website</li>
			<li>The MongoDB</li>
		</ul>

		<p>Each of the above components has unique and specialised roles in the overall system.</p>

		<p>We choose to use Javascript client side, server side and in the build system to reduce the language barrier of creating, maintaining and extending the system. Selecting the same languages for different parts of the system, means that less time is wasted acclimating to different development environments, so that while the code was running on different platforms: web browsers or servers, the development experience is similar.</p>

		<p><img src="img/full_diagram.png"></p>
	</div>
	<div class="panel-group" id="accordion">
		<div style="border-top: 1px solid #333;" class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
		        Build System</a>
		      </h1>
		    </div>
		    <div id="collapse1" class="panel-collapse collapse in">
			    <div class="content-primary header-padding">
					<h2 class="text-center secondary">Build System</h2>
					<p>Due the nature and scale of the project it was seen as necessary to automate as much of the build process of the application as possible. This means that the individual modules are all responsible for the own build process while systems that interact and comprise of a larger subsystem (Such as the server side code and the client which it serves) can run the modules own build systems. Our build system information documented here also includes information about the package / dependency management tools used.</p>
				</div>
				<div class="content-secondary header-padding">
					<h2 class="text-center secondary">Components</h2>
					<table style="width:70%; margin: 0 auto;">
					  	<tr>
						    <th style="width:50%;">Item</th>
						    <th style="width:50%;">Description</th> 
					  	</tr>
					  	<tr>
						    <td>Node Package Manager - NPM</td>
						    <td>NPM is a package management system that is part of the NodeJs system. It is commonly used when developing Web Applications as well and NodeJs applications.</td> 
					  	</tr>
					  	<tr>
						    <td>Bower Package Manager</td>
						    <td>Bower is a front end web dependency package manager, that is commonly used to include packages such as JQuery, bootstrap and AngularJs.</td> 
					  	</tr>
					  	<tr>
						    <td>Gulp</td>
						    <td>Gulp is a Javascript task runner. Unlike other build systems is emphasis’ code over configuration. As such you write tasks in Javascript rather than endless XML config files as with the ANT or GRUNT build systems</td> 
					  	</tr>
					  	<tr>
						    <td>General Scripting</td>
						    <td>Shell and Batch scripting used to tie the above systems together to reduce commands used for usage.</td> 
					  	</tr>
					</table>
				</div>
				<div class="content-primary header-padding">
					<h2 class="text-center secondary">Server / Client Build System</h2>
					<p>
						This system comprises of multiple batch / shell scripts and Gulp scripts. 
						</br></br>
						The <b>prebuild</b> script which gets required global dependencies, due to the nature of these dependencies it needs to run as an administrator of the system, but only needs to be ran once to set the system up for the build process. The global dependencies are the above listed tools.
						</br></br>
						Next is the <b>build</b> script which handles building the individual sub modules of the project. For example to build the client it install all the required NPM packages, all required Bower packages and the runs the clients Gulp script. This pattern installs the dependencies and allows the sub module to determine its build operations and is used for each server or client side module. Finally it runs the project level Gulp Script which packages the individually built components together in one runnable build. At this stage the only requirement is to drop in the SSL certs, the JWT certs and the configs.
						</br></br>
						This system means it is possible to pull the git repository to a new server and have the code running in as little time as possible, reducing risk and tediousness from performing these operations manually speeding up the development and deploy processes.
					</p>
				</div>
			</div>
		</div>
		<div class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
		        Server Architecture</a>
		      </h1>
		    </div>
		    <div id="collapse2" class="panel-collapse collapse">
			    <div class="content-primary header-padding">
					<h2 class="text-center secondary">Server Architecture</h2>
					<p><img src="img/server_diagram.png"></p>
				</div>
				<div class="content-secondary header-padding">
					<h2 class="text-center secondary">The Server</h2>
					<p>
						The server that our hosted system runs on is a <a href="https://www.digitalocean.com/pricing/">DigitalOcean Virtual Machine</a>, running Debian 8.2 (Jessie). The role of this machine was to run the server side code, handle request routing, host the database and serve up the client side files.
						</br></br>
						To achieve this the server runs several packages, each taking a unique role:
						</br></br>
						<a href="https://www.nginx.com/resources/wiki/">Nginx</a> determines the method for handling any incoming requests. If the request is from a valid domain and is made to either port 80 or  443, then it will be routed forward to the application endpoints. Otherwise the request is dropped unless caught by another listening application such as ssh running on port 22. This was employed due to its light footprint, speed of request handling, and ease of use when compared to the popular alternative Apache2. Nginx also terminates the signed HTTPS connection. It then creates an internal connection using our self-signed certificates to complete the forwarding to the NodeJS server. Nginx is also responsible for hosting and serving the website for this project.
						</br></br>
						<a href="https://nodejs.org/en/about">NodeJs</a> is the environment in which the application server is written. This was due to its extensive and well documented community, its ease of use when creating RESTful API’s and its build in package manager <a href="https://www.npmjs.com/">NPM (Node Package Manager)</a> which provides an extensive list of useful frameworks. NodeJs is project that is rapidly growing in popularity due to web developers already understanding the Javascript programming language and its ease of use in container environments such as Docker. 
						</br></br>
						<a href="https://www.npmjs.com/package/forever">Forever</a> is a NodeJs tool which is utilised to run the application server as a service on the system. We make use of this and the system Crontab function to ensure that the service is started on boot and restarted in the event of the application hanging or crashing. Forever monitors the process for unusual behavior and restarts it if this occurs. This is beneficial when compared to solely using crontab as the application is terminated if it hangs to prevent the system from hanging, and will only allow a single instance to run whereas crontab can potentially execute multiple instances in some circumstances.
						</br></br>
						<a href="https://docs.mongodb.org/manual/">MongoDB</a> was used as the data persistence layer of our application thanks to its NoSQL features, as it is a document store database. This enables us to quickly change data structures in the application without having to worry about running SQL update commands. Furthermore it meant we did not have to define a complete DB schema before use, leading to a more flexible development approach. Mongoose was chosen as the Object Relational Model(ORM) as it allows for developers to spend less time worrying about creating correct queries, rather calling clearly labeled methods on Database Access Objects.
						</br></br>
						<a href="https://letsencrypt.org/howitworks/">Let's Encrypt</a> is used to provide the HTTPS certificates. Partly because it is free, partly because it allows for an easy way to get signed, browser accepted SSL certificates. It features software tools in order to quickly authenticate the server and domain name against the let’s Encrypt servers and thus generate and deploy the SSL certificates.
					</p>
				</div>
				<div class="content-primary header-padding">
					<h2 class="text-center secondary">Application Server Architecture</h2>
					<p>
						The application server is written in NodeJs using two main frameworks: <a href="http://expressjs.com/">Express, a Fast, un-opinionated, minimalist web framework</a> and Mongoose, an elegant mongodb object modeling framework. These are used to handle the incoming user and API requests and liaise with the Mongo Database respectively. The API provides a stateless JSON RESTful API for user and fridge interaction.
						</br></br>
						Incoming requests are first checked to see if the match a file in the filesystem, such as the website or client files, if so these files are then served up to the user. If the request is a API request the request is sent to the API router, which handle the routing of API request to the appropriate controllers. 
						</br></br>
						The middleware feature of express is utilised to ensure user authentication, this ensures that no requests can hit the API with the appropriate access token being present. For the access tokens <a href="https://jwt.io/">Json Web Tokens (JWT)</a> are utilised. This means that the token contains all the required user information to complete an API request. This is then attached to the request object for future use. User data is encrypted before sending to the client using self signed certs to ensure that they are not forged ensuring the tokens have been issued by our system, and sensitive data is not leaked. This offers another line of defense after the use of HTTPS to ensure data protection.
						</br></br>
						From there the request is routed to the appropriate controller by the API routing, it is then handled liaising with MongoDB via Mongoose for data retrieval and storage. Upon completion of a request a JSON formatted response is sent to the user in the following form:
					</p>
					</br></br>
					<p><img src="img/json_request_example.png"></p>
					</br></br>
					<p>Other notable information:</p>
					<ul>
						<li>The API is documented using apidocjs[link] the result can be seen here [link]</li>
						<li>Morgan is used for extensive logging</li>
						<li>NPM is used for dependency management.</li>
						<li>A full list of all of the plugins can be found in the server package.json file on <a href="https://github.com/nightpaws/Elite-Team-6">GitHub</a></li>
						<li>No significant build process is ran on the application server as it is written in a runnable state.</li>
					</ul>
				</div>
		    </div>
		</div>
		<div class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
		        Client Side Architecture</a>
		      </h1>
		    </div>
		    <div id="collapse3" class="panel-collapse collapse">
				<div class="content-primary">
					<h2 class="text-center secondary">Client Side Architecture</h2>
				</div>
				<div class="content-secondary header-padding">
					<h2 class="text-center secondary">Client Single Page Application</h2>
					<p>
						TThe Single Page Application is written using AngularJs to provide a quick and seamless user interaction. AngularJs was chosen due to this and developer experience with the technology resulting in a quick and fast paced development process. 
						</br></br>
						<a href="http://angular-ui.github.io/ui-router/site/#/api/ui.router">Angular UI Router[</a> was utilised to provide the application routing over the default Angular router due to its advanced state management and nesting capabilities as well as its multiple views. These features enable the application to comprise of several nested views and components resulting in a frame, the header and navigation, which contains a view into which the functional templates and controllers can be injected. While developing the frame was a large initial outlay in terms of development time (almost half the development time for the SPA was spent on the frame) it enables the functional components to be quickly built and integrated with the existing application. With the welcome page of the dashboard being build in under an hour.
						</br></br>
						The Angular application was written in line with standard modern web development and Angular practices. As such the Application takes a typical structure of HTML templates and controllers. These are helped by user services and request factories, used to manage and abstract making HTML requests. Alongside this HTTP interceptors (Middleware) is utilised to automatically inject header information and the access token, simplifying the act of making API requests.
						</br></br>
						<a href="http://sass-lang.com/">Sass</a> was utilised to make writing CSS a somewhat enjoyable experience as it includes many features which are missing from CSS such as nested selections, variables, easy importation of multiple files and functions. This was then pre-compiled down to CSS during the build process.
						</br></br>
						The build system for the client uses <a href="http://gulpjs.com/">Gulp</a>, which is a Javascript task runner. It is used to reduce developer workload by reducing the build steps to one single command. In this case it is used to handle: deleting the old build; compiling the Sass to CSS; copying all the source files to the correction locations; and dependency injection into the HTML page thus removing the need to manage link and scripts tags manually. 
						</br></br>
						Bower was used over NPM as the dependency management tool for the application due to its flat dependency tree structure thus allowing fine control over included libraries and limiting the number of files that need to be served to the client.
					</p>
					</br></br>
					<p>Other notable information:</p>
					<ul>
						<li>NPM is used for development dependency management.</li>
						<li>Bower is used for dependency management.</li>
						<li>A full list of all of the plugins can be found in the clients bower.json file on <a href="https://github.com/nightpaws/Elite-Team-6">GitHub</a></li>
						<li>A full list of all of the development plugins can be found in the client's package.json file on <a href="https://github.com/nightpaws/Elite-Team-6">GitHub</a></li>
					</ul>
				</div>
				<div class="content-primary header-padding">
					<h2 class="text-center secondary">Website</h2>
					<p>
						The website is built using PHP to reduce the duplication of HTML elements. This is served to the client using the Nginx server. Also, as in the SPA client, Sass is used to reduce developer workload. It has imports for both Bootstrap and JQuery to have some of the functionality of Bootstrap available for drop down boxes and navigation bar.
						</br></br>
						The website is also developed using a Gulp script to make it easier on the development process and to be able to build the Sass files into a build CSS file. THe Sass files are separated to make it easier to maintain in the long term.
					</p>
				</div>
		    </div>
		</div>
		<div class="panel content-primary">
		    <div class="header-padding primary text-center">
		      <h1>
		        <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">
		        Embedded Architecture</a>
		      </h1>
		    </div>
		    <div id="collapse4" class="panel-collapse collapse">
		    	<div class="content-primary header-padding">
					<h2 class="text-center secondary">Embedded Architecture</h2>
					<p>The Embedded Architecture can be broken down into two sections - the Arduino Uno which is used to control the door sensor, temperature sensor and an LED indicating the door status and the Raspberry Pi which controls the output from the Arduino, the barcode scanner, the Wii Board and server communications.</p>
					<p><img src="img/embedded_diagram.png"></p>
				</div>
				<div class="content-secondary header-padding">
					<h2 class="text-center secondary">Arduino Uno</h2>
					<p>
						The Arduino Uno was chosen due to it's simplicity as a microcontroller and its easy to use C based programming language and IDE. Although simple to learn and use it provides all of the functionality required to control the door sensor and temperature sensor. Using the dedicated IDE it was a breeze to deploy code to the Arduino with the built in serial monitor being very useful monitoring values during testing.
						</br></br>
						The temperature sensor is an Adafruit Waterproof Digital Temperature Sensor which utilises the Dallas 1-Wire protocol. This library removed the need to perform calculations to convert a voltage to a temperature as it returns an accurate temperature reading based on the digital signal from the sensor when connected to one of the Arduino's digital pins.
						</br></br>
						The door sensor is made up from an Adafruit Magnetic Contact Switch. When the two magnetic contacts are touching, a current is flowing therefore we can detect a signal on a digital pin of the arduino which tells us the door is closed. When no signal is detected on the digital pin the door must be open. A LED is also attached to the arduino to monitor the door’s status.
						</br></br>
						<img src="img/circuit_diagram.png">
						</br></br>
						The Arduino circuitry is composed of a parallel circuit with two branches - one to control the temperature sensor and another to control the magnetic switch attached to the door of the switch. Each branch contains a connection to a digital input/output pin on the Arduino which are marked in green on the diagram along with the pin number Green wires represent the connections to the digital input/output pins on the Arduino.
						</br></br>
						The first branch (top of diagram) contains two components - the digital temperature sensor and a resistor. The GND and 5V wire of the sensor are both connected to 0V. The data wire is connected to the resistor which pulls it up to 5V and a digital pin on the Arduino.
						</br></br>
						The second branch (bottom of diagram) detects whether the door is opened or closed. When the door is open there is no connection between the magnetic contacts, so the pin is connected to ground (through the pull-down resistor) and we read a LOW. When the door is closed, it makes a connection between the two contacts, connecting the pin to voltage, so that we read a HIGH. (The pin is still connected to ground, but the resistor resists the flow of current, so the path of least resistance is to +5V).
						</br></br>
						It was originally planned to connect the arduino to the Raspberry Pi via the GPIO pins but during the development process it was discovered that connecting the Arduino to the Pi via USB was significantly easier from both the hardware and software point of view: there is a small risk of damaging the hardware and using the libraries for handling Serial connections was much simpler.
					</p>
				</div>
				<div class="content-primary header-padding">
					<h2 class="text-center secondary">Raspberry Pi</h2>
					<p>
						The Raspberry Pi brings together all of the data from the three main hardware components in the system - the Arduino, the barcode scanner and the Wii Board. Python was used to create a program to pull the data from these three very different components, merges it all together and send it off to the server. Python was chosen as it has a lot of support for libraries that allow the pi to communicate with these different pieces of hardware.
						</br></br>
						PySerial was used for reading the data from the Arduino's USB connection as a stream of bytes which are then interpreted as the values of the current temperature and door state. An issue appeared where two threads tried to access the serial connection resulting in an exception being thrown. When the exception is caught the latest known value is returned until a new value can be obtained from the Arduino.
						</br></br>
						PyBlueZ is a wrapper around system bluetooth libraries which simplifies connecting to bluetooth devices. In this case the device was the Wii Board. Unfortunately it was not possible to permanently sync the Wii Board with the Raspberry Pi due to the “hacky” nature of the Wii Fit Board communication therefore the board must be manually reconnected every time on startup. 
						</br></br>
						Requests was used to handle communication with the RESTful api. The package allows the user to call post, put, delete and get on a request object which will return a response object. JSON files can then be accessed from the response objects which contain details about successful communications with the server. Requests also simplifies the process of attaching JSON files and HTTP header content to the requests.
						</br></br>
						The python evdev library allows for reading input events on linux such as keyboard input, mouse clicks and movement or even touch screen movement. In the case of this project the library was used to collect the input from the barcode scanner. The barcode scanner used in the project connects to the pi over usb and behaves like a keyboard so when a barcode is scanned the system interprets that as keyboard input and 'types' the barcode. Unfortunately it's not possible to rely on this method to retrieve barcode input therefore the evdev library can be used to return a series of "Key Down" events from the barcode scanner. Each keydown event will be a different number key. By piecing together the numbers in the order that the events are received, the barcode that was scanned can be created.
					</p>
				</div>
		    </div>
		</div>
	</div>
</main>

<?php include ('footer.php'); ?>
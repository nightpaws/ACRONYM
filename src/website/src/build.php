<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>How to Build</h1>
		<h4>I want to get my own!</h4>
	</div>
	<div class="content-secondary header-padding">
		<h1 class="primary">Embedded System</h1>
			<h2 class="trinary">Arduino Uno</h2>
				<h3 class="secondary">Step One - Get the Code</h3>

				<p>The code is hosted on Github [link] Pull the code and then open the arduino project within the Arduino IDE.</p>

				<h3 class="secondary">Step Two - Upload code to Arduino</h3>

				<p>Using the IDE, upload the code to the Arduino.</p>

			<h2 class="trinary">Raspberry Pi</h2>
				<h3 class="secondary">Step One - Install missing packages</h3>

				<p>> sudo apt-get install python-dev bluetooth libbluetooth-dev</p>

				<h3 class="secondary">Step Two - Install PIP (Python package manager)</h3>

				<p>> wget https://bootstrap.pypa.io/get-pip.py</p>
				<p>> sudo python get-pip.py</p>

				<h3 class="secondary">Step Three - Install PyBlueZ</h3>

				<p>> sudo pip install pybluez</p>

				<h3 class="secondary">Step Four - Ensure that bluetooth is enabled</h3>

				<p>> sudo hciconfig hci0 reset</p>
				<p>> sudo hciconfig hci0 up</p>

				<h3 class="secondary">Step Five - Get the Code</h3>

				<p>The code is hosted on Github [link] Pull the code.</p>
	</div>
	<div class="content-primary header-padding">
		<h1 class="primary">Server Side</h1>
			<h3 class="secondary">Step 1 - Install prerequisites</h3>
			<p>
				This project requires that you install NodeJs[link], MongoDB[link], git and python 2.7+. Guides for doing this can be found at their respective sites.
			</p>
			<h3 class="secondary">Step 2 - Get the Code</h3>
			<p>
				The code is hosted on Github [link] Pull the code.
			</p>
			<h3 class="secondary">Step 3 - Run Prebuild script</h3>
			<p>
				The prebuild script was created to install global level components of the system, these are Gulp and Bower. 
				As well as a few local dependencies. It needs to be run with sudo access. This script only needs to be run once to set up the system for use.
			</p>
			<p>
				> ./prebuild.sh
			</p>
			<h3 class="secondary">Step 4 - Run the Build Script</h3>
			<p>
				The build script was created to perform the individual build steps of each sub module. 
			</p>
			<p>
				? ./build.sh
			</p>
			<h3 class="secondary">Step 5 - Generate or get the SSL certs required</h3>
			<p>
				We use Let's Encrypt for the public certs. the certs used for the auth should be different.
			</p>
			<p>
				link to a guide, or write it out
			</p>
			<h3 class="secondary">Step 6 - Drop in/edit your config to your liking</h3>
			<h3 class="secondary">Step 7 - Run the serve</h3>
			<p>
				../build > node index.js
			</p>
			<h3 class="secondary">Additional Advice</h3>
			<p>
				We recommend you run the server behind a Nginx server, passing the requests on.
			</p>
	</div>
</main>

<?php include ('footer.php'); ?>
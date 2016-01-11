<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary">
		<h1>How to Build</h1>
		<h4>I want to get my own!</h4>
	</div>
	<div class="content-boxes container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<div class="primary step-box">
					<h1>Embedded System</h1>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="trinary step-box">
					<h1>Server Side</h1>
					<h3>Step 1 - Install prerequisites</h3>
					<p>
						This project requires that you install NodeJs[link], MongoDB[link], git and python 2.7+. Guides for doing this can be found at their respective sites.
					</p>
					<h3>Step 2 - Get the Code</h3>
					<p>
						The code is hosted on Github [link] Pull the code.
					</p>
					<h3>Step 3 - Run Prebuild script</h3>
					<p>
						The prebuild script was created to install global level components of the system, these are Gulp and Bower. 
						As well as a few local dependencies. It needs to be run with sudo access. This script only needs to be run once to set up the system for use.
					</p>
					<p>
						> ./prebuild.sh
					</p>
					<h3>Step 4 - Run the Build Script</h3>
					<p>
						The build script was created to perform the individual build steps of each sub module. 
					</p>
					<p>
						? ./build.sh
					</p>
					<h3>Step 5 - Generate or get the SSL certs required</h3>
					<p>
						We use Let's Encrypt for the public certs. the certs used for the auth should be different.
					</p>
					<p>
						link to a guide, or write it out
					</p>
					<h3>Step 6 - Drop in/edit your config to your liking</h3>
					<h3>Step 7 - Run the serve</h3>
					<p>
						../build > node index.js
					</p>
					<h3>Additional Advice</h3>
					<p>
						We recommend you run the server behind a Nginx server, passing the requests on.
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="secondary step-box">
					<h1>Final Steps</h1>
				</div>
			</div>
		</div>
	</div>
</main>

<?php include ('footer.php'); ?>
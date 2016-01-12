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
</main>

<?php include ('footer.php'); ?>
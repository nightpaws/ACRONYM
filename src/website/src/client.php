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
	<div class="content-primary">
		<h2 class="text-center secondary">Client Side Architecture</h2>
	</div>
	<div class="content-secondary header-padding">
		<h2 class="text-center secondary">Client Single Page Application</h2>
		<p>
			TThe Single Page Application is written using AngularJs to provide a quick and seamless user interaction. AngularJs was chosen due to this and developer experience with the technology resulting in a quick and fast paced development process. 
			</br></br>
			Angular UI Router[link] was utilised to provide the application routing over the default Angular router due to its advanced state management and nesting capabilities as well as its multiple views. These features enable the application to comprise of several nested views and components resulting in a frame, the header and navigation, which contains a view into which the functional templates and controllers can be injected. While developing the frame was a large initial outlay in terms of development time (almost half the development time for the SPA was spent on the frame) it enables the functional components to be quickly built and integrated with the existing application. With the welcome page of the dashboard being build in under an hour.
			</br></br>
			The Angular application was written in line with standard modern web development and Angular practices. As such the Application takes a typical structure of HTML templates and controllers. These are helped by user services and request factories, used to manage and abstract making HTML requests. Alongside this HTTP interceptors (Middleware) is utilised to automatically inject header information and the access token, simplifying the act of making API requests.
			</br></br>
			Sass[link] was utilised to make writing CSS a somewhat enjoyable experience as it includes many features which are missing from CSS such as nested selections, variables, easy importation of multiple files and functions. This was then pre-compiled down to CSS during the build process.
			</br></br>
			The build system for the client uses Gulp[link], which is a Javascript task runner. It is used to reduce developer workload by reducing the build steps to one single command. In this case it is used to handle: deleting the old build; compiling the Sass to CSS; copying all the source files to the correction locations; and dependency injection into the HTML page thus removing the need to manage link and scripts tags manually. 
			</br></br>
			Bower was used over NPM as the dependency management tool for the application due to its flat dependency tree structure thus allowing fine control over included libraries and limiting the number of files that need to be served to the client.
		</p>
		</br></br>
		<p>Other notable information:</p>
		<ul>
			<li>NPM is used for development dependency management.</li>
			<li>Bower is used for dependency management.</li>
			<li>A full list of all of the plugins can be found in the clients bower.json file on GitHub [link]</li>
			<li>A full list of all of the development plugins can be found in the client's package.json file on GitHub [link]</li>
		</ul>
	</div>
	<div class="content-primary header-padding">
		<h2 class="text-center secondary">Website</h2>
		<p>
			The website is build using php to reduce the duplication of HTML elements. This is served to the client using the Nginx server. As in the SPA client Sass is used to reduce developer workload.
		</p>
	</div>
</main>

<?php include ('footer.php'); ?>
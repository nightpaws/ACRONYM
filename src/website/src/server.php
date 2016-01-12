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
		<h2 class="text-center secondary">Server Architecture</h2>
		<p>{{insert pretty diagram}}</p>
	</div>
	<div class="content-secondary header-padding">
		<h2 class="text-center secondary">The Server</h2>
		<p>
			The server that our hosted system runs on is a DigitalOcean Virtual Machine {{link}}, running Debian 8.2 (Jessie). The role of this machine was to run the server side code, handle request routing, host the database and serve up the client side files.
			</br></br>
			To achieve this the server runs several packages, each taking a unique role:
			</br></br>
			Nginx[link] determines the method for handling any incoming requests. If the request is from a valid domain and is made to either port 80 or  443, then it will be routed forward to the application endpoints. Otherwise the request is dropped unless caught by another listening application such as ssh running on port 22. This was employed due to its light footprint, speed of request handling, and ease of use when compared to the popular alternative Apache2. Nginx also terminates the signed HTTPS connection. It then creates an internal connection using our self-signed certificates to complete the forwarding to the NodeJS server. Nginx is also responsible for hosting and serving the website for this project.
			</br></br>
			NodeJs is the environment in which the application server is written. This was due to its extensive and well documented community, its ease of use when creating RESTful API’s and its build in package manager NPM (Node Package Manager)[link] which provides an extensive list of useful frameworks. NodeJs is project that is rapidly growing in popularity due to web developers already understanding the Javascript programming language and its ease of use in container environments such as Docker. 
			</br></br>
			Forever[link] is a NodeJs tool which is utilised to run the application server as a service on the system. We make use of this and the system Crontab function to ensure that the service is started on boot and restarted in the event of the application hanging or crashing. Forever monitors the process for unusual behavior and restarts it if this occurs. This is beneficial when compared to solely using crontab as the application is terminated if it hangs to prevent the system from hanging, and will only allow a single instance to run whereas crontab can potentially execute multiple instances in some circumstances.
			</br></br>
			MongoDB is used as our data storage utility. It was chosen as the application server is written in NodeJs which integrates which MongoDB nicely.
			</br></br>
			Let's Encrypt is used to provide the HTTPS certs. {{insert more bullshit]}}
		</p>
	</div>
	<div class="content-primary header-padding">
		<h2 class="text-center secondary">Application Server Architecture</h2>
		<p>
			The application server is written in NodeJs using two main frameworks: Express, a Fast, un-opinionated, minimalist web framework [link] and Mongoose, an elegant mongodb object modeling framework. These are used to handle the incoming user and API requests and liaise with the Mongo Database respectively. The API provides a stateless JSON RESTful API for user and fridge interaction.
			</br></br>
			Incoming requests are first checked to see if the match a file in the filesystem, such as the website or client files, if so these files are then served up to the user. If the request is a API request the request is sent to the API router, which handle the routing of API request to the appropriate controllers. 
			</br></br>
			The middleware feature of express is utilised to ensure user authentication, this ensures that no requests can hit the API with the appropriate access token being present. For the access tokens Json Web Tokens (JWT)[link] are utilised. This means that the token contains all the required user information to complete an API request. This is then attached to the request object for future use. User data is encrypted before sending to the client using self signed certs to ensure that they are not forged ensuring the tokens have been issued by our system, and sensitive data is not leaked. This offers another line of defense after the use of HTTPS to ensure data protection.
			</br></br>
			From there the request is routed to the appropriate controller by the API routing, it is then handled liaising with MongoDB via Mongoose for data retrieval and storage. MongoDB was used as the data persistence layer of our application thanks to its NoSQL features as it is a document store database. This enables us to quickly change data structures in the application without having to worry about running SQL update commands. Furthermore it meant we did not have to define a complete DB schema before use, leading to a more flexible development approach. Mongoose was chosen as the Object Relational Model(ORM) as it allows for developers to spend less time worrying about creating correct queries, rather calling clearly labeled methods on Database Access Objects. Upon completion of a request a JSON formatted response is sent to the user in the following form:
		</p>
		</br></br>
		<img class="center-image" src="http://placehold.it/500x300">
		</br></br>
		<p>Other notable information:</p>
		<ul>
			<li>The API is documented using apidocjs[link] the result can be seen here [link]</li>
			<li>Morgan is used for extensive logging</li>
			<li>NPM is used for dependency management.</li>
			<li>A full list of all of the plugins can be found in the server package.json file on GitHub [link]</li>
			<li>No significant build process is ran on the application server as it is written in a runnable state.</li>
		</ul>
	</div>
</main>

<?php include ('footer.php'); ?>
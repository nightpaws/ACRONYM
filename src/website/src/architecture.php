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

		<p>{{pretty diagram of the overall system}}</p>
	</div>
</main>

<?php include ('footer.php'); ?>
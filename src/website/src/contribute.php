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
		</p>
	</div>
</main>

<?php include ('footer.php'); ?>
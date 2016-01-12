<?php include ('header.php'); ?>
<?php include ('toolbar.php'); ?>

<main>
	<div class="content-primary text-center">
		<h1>Project Organisation</h1>
		<h3>How did we do it?</h3>
	</div>
	<div class="content-secondary header-padding">
		<div class="primary">
			<h1>Project Management</h1>
		</div>
		<p>
			As a team, continuing on the planning that we undertook in Phase 1 of the assignment, we decided it would be best to use an Agile development method. Upon taking this choice we agreed that we would need to centralise our work and task allocations. Rather than all maintain separate copies of the project code and associated documentation we decided that it would be sensible to use shared mediums and repositories for all resources.
			</br></br>
			As we had adapted an agile method of development we felt that it was key to have weekly scrum meetings, while being aware not to get bogged down in bureaucracy. This resulted in quick meetings where we would establish what had been achieved and the next steps. Issues were then created to reflect the discussions at these meetings. This enabled us to keep a good model of project progress in our heads and ensure that we were (or were not) on track to deliver a working system. 
			</br></br>
			Working off the back of the phase 1 submission, where he had a project plan, we were able to closely monitor our performance against this, adjusting when required, while not letting it dictate our methods and progress. This loose following of the plan is in spirit of the original agile development pattern, and is currently seeing a resurgence as it reduces management interference and can be seen to aid developer productivity. 
			</br></br>
			For our documentation we agreed to utilise Google Drive due to its unparalleled shared editing functionality, suggestion system for proposing and discussing changes, reliability for hosting our most essential data, and it’s realtime backups protecting against data loss during the project. We made use of this when holding our weekly meetings to update our progress and goals, taking minutes using the Docs application. Over the holidays we also used this in combination with Hangouts in order to plan further progression whilst University was closed.
			</br></br>
			To speed the development of our system we elected to use a comprehensive build system. This resulting in less developer time being spent on tedious tasks, reducing the possibility for errors and ensuring that anyone can easily and cleanly deploy the application in a workable state. 
		</p>
	</div>
	<div class="content-primary header-padding">
		<div class="trinary">
			<h1>Code Management</h1>
		</div>
		<p>
			As a group we chose to use git as our version control system utilising Github as remote repository. This was chosen due to developer familiarity with the system, reducing time required to learn new tools and workflows. We adapted a git flow and branching model to ensure that our repository was clearly organised with the master branch being reserved for production level code. More information about the branching model choosen can be found here -   <a href="http://nvie.com/posts/a-successful-git-branching-model/">http://nvie.com/posts/a-successful-git-branching-model/</a> 
		</p>
	</div>
	<div class="content-secondary header-padding">
		<div class="secondary">
			<h1>Issue Management</h1>
		</div>
		<p>
			Since we had chosen GitHub as our version control system. We also decided to take advantage of the built in issue and milestone tracker. We decided to make use of the free to use Google Chrome and Firefox addon <a href="https://www.zenhub.io/">ZenHub</a> which expands upon the existing functions by providing a KanBan board layout and prioritisation functions for the boards. By using this we are able to make use of full GitHub integration, referencing issues, commits and assigning tasks that synchronize with project milestones. The built in email notification function of GitHub assists by immediately notifying all users of changes.
		</p>
	</div>
	<div class="content-primary header-padding">
		<div class="trinary">
			<h1>Non-Centralised Data</h1>
		</div>
		<p>
			Some configuration data was not able to be stored on the Git Repository as it was used in configuring the web server. The configuration files for Nginx, PHP, and Node were not stored in the repository. Instead these were backed up using the <a href="https://www.digitalocean.com/community/tutorials/digitalocean-backups-and-snapshots-explained">DigitalOcean Hosting panel’s Snapshot feature</a> which behaves as an offsite backup utility for the current server state. This allowed us to recover in the event of a mistake taking the server offline, and protected us against the possibility of server failure costing us our data. 
		</p>
	</div>
</main>

<?php include ('footer.php'); ?>
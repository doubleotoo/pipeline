Pipeline - Eliminate boiler-plate Javascript code for AJAX interactions
=======================================================================

## INSPIRATION

I was inspired to do this project because of the following Facebook Tech Talk - https://www.facebook.com/video/video.php?v=596368660334

## DESCRIPTION

As web developers, we are always writing the same boilerplate javascript code to wire very similar AJAX interactions. This is unnecessary and there is a better way.

80% of AJAX interactions can be boiled to a very small set of steps:

1. User clicks on a link or submits a form, 
2. an AJAX request is sent to the server, 
3. some markup is put into the DOM.

By framing AJAX interactions into the steps above, we can now perform majority of the Ajax interactions with very little effort, with Pipeline.


## INSTALLATION

The best way to install Pipeline is via Gemfile:

    gem "pipeline", :git => 'git://github.com/legalreach/pipeline.git'

## EXAMPLES

http://pipeline-examples.herokuapp.com/

## USING

Let's see how Pipeline solves for the 3 steps:

1. User clicks on a link or submits a form

	* To wire a click or form submission to happen asynchronously, all we need to do is add a "rel=async" attribute. For example,
		
		```
		<a href="/some_url" rel="async">Click Me, I'm Async</a>
		<form action="/some_url" method="post" rel="async"></form>
		```

1. an AJAX request is sent to the server

	* The pipeline code automatically detects an async attribute and opens up an Ajax call to the server using the url in the href or action attribute

3. some markup is put into the DOM.
	
	* When processing the server request, the controller action will inject markup (or any JS code) that will automaticaly be executed at the client. The rails code to perform this is,
	
		```
		render_for_pipeline("some_view_to_be_rendered", "", "") { |rendered_view| 
			<<-eos
				$(this).html(rendered_view); // injects/replaces html markup on the browser
			eos
		}
		```

## COMPANIES ALREADY USING THIS

LegalReach, MyDressAffair, TableSlice

## CONTRIBUTE

If you'd like to hack on Pipeline, start by forking my repo on GitHub:

http://github.com/legalreach/pipeline

If you have any ideas or suggestions, feel free to contact me at avlok@legalreach.com


Copyright © 2011 Avlok Kohli of LegalReach, released under the MIT license
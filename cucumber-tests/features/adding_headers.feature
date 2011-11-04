Feature: adding headers
	As someone who knows about HTTP
	I want to be able to add headers to my requests

Background:
	When I open the hateoas console
	And I enter http://hateoas-console.local/ in the address box
	And I select GET from the verb selector

Scenario:
	When I enter a valid header and value
	Then the header value appears on screen

Scenario:
	When I enter a reserved header
	Then I receive an invalid header warning

Scenario:
	When I enter a reserved header prefix
	Then I receive an invalid header warning

Scenario:
	When I enter a header with out-of-range characters
	Then I receive an invalid header warning
	
Scenario:
	When I enter a header value with out-of-range characters
	Then I receive an invalid header warning
	
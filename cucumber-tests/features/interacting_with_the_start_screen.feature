#language: en
Feature: Interacting with the start screen
	As a user of the system
	When I see the start screen
	I don't want to see unnecessary information

Background:
	When I open the hateoas console

Scenario:
	Then the request body field is not visible
	
Scenario:
	When I select GET from the verb selector
	Then the request body field is not visible
	
Scenario:
	When I select PUT from the verb selector
	Then the request body field is visible
	
Scenario:
	When I select POST from the verb selector
	Then the request body field is visible
	
Scenario:
	When I select DELETE from the verb selector
	Then the request body field is not visible
	
Scenario:
	When I select OPTIONS from the verb selector
	Then the request body field is not visible

Scenario:
	When I select HEAD from the verb selector
	Then the request body field is not visible
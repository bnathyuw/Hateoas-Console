#language: en
Feature: Interacting with the start screen
	As a user of the system
	When I see the start screen
	I don't want to see unnecessary information

Background:
	When I open the hateoas console

Scenario:
	Then the request body field is not visible
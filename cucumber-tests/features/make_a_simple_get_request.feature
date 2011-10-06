#language: en
Feature: Make a simple GET request

Background:
	When I open the hateoas console
	And I enter http://hateoas-console.local/ in the address box
	And I select GET from the verb selector
	And I click Go

Scenario: Logs request
	Then my request is logged

Scenario: Logs response
	Then the response is logged

Scenario: Displays links
	Then links from the response are logged
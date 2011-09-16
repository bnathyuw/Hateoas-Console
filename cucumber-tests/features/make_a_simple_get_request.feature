#language: en
Feature: Make a simple GET request

  Background:
    Given I have a browser open
	And I open the hateoas console
    And I enter http://www.google.com/ in the address box
	And I select GET from the verb selector
	And I click Go

  Scenario: Logs request
	Then my request is logged
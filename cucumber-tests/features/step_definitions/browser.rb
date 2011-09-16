require 'watir-webdriver'

Given /^I have a browser open$/ do
  @browser ||= new_browser
end

Given /^I open the hateoas console$/ do
  @browser.goto "http://hateoas-console.local/"
end

Given /^I enter (\S*) in the address box$/ do |address|
  @address = address
  @browser.text_field(:name => 'url').set(address)
end

Given /^I select (\S*) from the verb selector$/ do |verb|
  @verb = verb
  @browser.select_list(:name => 'verb').select verb
end

Given /^I click Go$/ do
  @browser.button(:value => 'Go').click
end

Then /^my request is logged$/ do
  @browser.pre(:id => 'request').text.include? '#{@verb} #{@address}'
end
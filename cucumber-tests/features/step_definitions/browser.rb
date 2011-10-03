Given /^I have a browser open$/ do
  
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
  @browser.pre(:id => 'request').text.include?('#{@verb} #{@address}').should be_true
end

Then /^the response is logged$/ do
  @browser.pre(:id => 'response').text.include?('<title>HATEOAS console</title>').should be_true
end

Then /^links from the response are logged$/ do
  @browser.div(:id => 'links').table.exists?.should be_true
end
When /^I open the hateoas console$/ do
	@browser.goto "http://hateoas-console.local/"
end

When /^I enter (http:\/\/([^\/]*)\/(.*)) in the address box$/ do |url, host, path|
	@host = host
	@path = path
	@browser.text_field(:name => 'url').set(url)
end

When /^I select (\S*) from the verb selector$/ do |verb|
	@verb = verb
	@browser.select_list(:name => 'verb').select verb
end

When /^I click Go$/ do
	@browser.button(:value => 'Go').click
end

Then /^my request is logged$/ do
	text = @browser.pre(:id => 'request').text
	text.should include("#{@verb} /#{@path} HTTP/1.1")
	text.should include("Host: #{@host}")
end

Then /^the response is logged$/ do
	@browser.pre(:id => 'response').text.should include('<title>HATEOAS console</title>')
end

Then /^links from the response are logged$/ do
	@browser.div(:id => 'links').table.exists?.should be_true
end

Then /^the (\S*) field is( not)? visible$/ do | name, not_visible |
	field = @browser.text_field(:name => name)
	if not_visible == " not" then
		field.should_not be_visible
	else
		field.should be_visible
	end
end
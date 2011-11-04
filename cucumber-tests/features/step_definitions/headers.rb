When /^I enter a valid header and value$/ do
  @browser.text_field(:name => "header-name").set("foo")
  @browser.text_field(:name => "header-value").set("bar")
  @browser.button(:value => "+").click
end

Then /^the header value appears on screen$/ do
  pending # express the regexp above with the code you wish you had
end

When /^I enter a reserved header$/ do
  @browser.text_field(:name => "header-name").set("Accept-Charset")
  @browser.text_field(:name => "header-value").set("bar")
  @browser.button(:value => "+").click

end

Then /^I receive an invalid header warning$/ do
  pending # express the regexp above with the code you wish you had
end

When /^I enter a reserved header prefix$/ do
  @browser.text_field(:name => "header-name").set("Proxy-Foo")
  @browser.text_field(:name => "header-value").set("bar")
  @browser.button(:value => "+").click
end

When /^I enter a header with out\-of\-range characters$/ do
  @browser.text_field(:name => "header-name").set("abcΞdef")
  @browser.text_field(:name => "header-value").set("bar")
  @browser.button(:value => "+").click
end

When /^I enter a header value with out\-of\-range characters$/ do
  @browser.text_field(:name => "header-name").set("foo")
  @browser.text_field(:name => "header-value").set("abcΞdef")
  @browser.button(:value => "+").click
end
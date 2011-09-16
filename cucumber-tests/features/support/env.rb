require "watir-webdriver"

  def new_browser
    @@browser ||= Watir::Browser.new :firefox
  end

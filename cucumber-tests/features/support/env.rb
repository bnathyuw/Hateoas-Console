require "watir-webdriver"

  def browser
    @@browser ||= new_browser
  end

  def new_browser
    @@browser = Watir::Browser.new :firefox
  end

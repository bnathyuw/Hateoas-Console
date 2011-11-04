# HATEOAS Console

For more information on the motivation behind this work, please read my original blog post, [HATEOAS Console: the beginning](http://blog.matthewbutt.com/2011/09/18/hateoas-console-the-beginning/).

## Setup

The projects are configured to be set up on a web server like this:

**http://hateoas-console.local/** maps to **/Hateoas-Console/app/**  
**http://hateoas-console.local/lib/** maps to **/Hateoas-Console/lib/**
**http://unit-tests.hateoas-console.local/** maps to **/Hateoas-Console/unit-tests/**
**http://unit-tests.hateoas-console.local/lib/** maps to **/Hateoas-Console/lib/**

If you don't configure the project like this, the unit tests won't run.

## Running the project and tests

I have been testing exclusively in Chrome, as this project uses some modern
JavaScript. It may well work in FireFox, but woe betide anyone who attempts to 
run it in Internet Explorer

## Other notes

### Headers that cannot be set by user

When using an XMLHttpRequest, there are certain headers that you cannot set; they are automatically set by the browser instead.

They are:

* Accept-Charset
* Accept-Encoding
* Connection
* Content-Length
* Cookie
* Cookie2
* Content-Transfer-Encoding
* Date
* Expect
* Host
* Keep-Alive
* Referer
* TE
* Trailer
* Transfer-Encoding
* Upgrade
* User-Agent
* Via
* Proxy-*
* Sec-*

Further information can be found in the [XMLHttpRequest documentation: The setRequestHeader() method](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method)
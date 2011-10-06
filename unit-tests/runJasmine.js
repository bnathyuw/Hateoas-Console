/*global jasmine:false */
jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
jasmine.getEnv().execute();
jasmine.getFixtures().fixturesPath = "http://unit-tests.hateoas-console.local/spec/fixtures";
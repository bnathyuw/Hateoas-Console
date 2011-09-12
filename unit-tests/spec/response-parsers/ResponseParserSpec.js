﻿/*global describe: false, HATEOAS_CONSOLE: false, it: false, expect: false */

describe("ResponseParser", function () {
	"use strict";
	var responseParser = HATEOAS_CONSOLE.responseParsers.responseParser;
	
	it("should identify itself as ResponseParser", function () {
		var parser = responseParser({linkFinder: {}});
		
		expect(parser.constructor.name).toEqual("ResponseParser");
	});
	
	describe("getLinks", function () {
		it("should return links from getLinks", function () {
			var linksReturned = [
					{uri: "a", location: 10},
					{uri: "b", location: 20},
					{uri: "a", location: 30}
				],
				expectedLinks = [
					{uri: 'a', locations: [10, 30], rel: [], rev: []},
					{uri: 'b', locations: [20], rel: [], rev: []}
				],
				getLinks = function () {
					return linksReturned;
				},
				parser = responseParser({linkFinder: {getLinks: getLinks}}),
				actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(2);
			
			expect(actualLinks[0].uri).toEqual("a");
			expect(actualLinks[1].uri).toEqual("b");
			
			expect(actualLinks[0].locations).toEqual([10, 30]);
			expect(actualLinks[1].locations).toEqual([20]);

		});
		
		it("should call getLinks only once", function () {
			var callCount = 0,
				getLinks = function () {
					callCount += 1;
					return [];
				},
				parser = responseParser({linkFinder: {getLinks: getLinks}});
			
			parser.getLinks();
			parser.getLinks();
			
			expect(callCount).toEqual(1);
		});
		
		it("should mark links as same origin if and only if they have the same scheme and authority", function () {
			var linksReturned = [
					{uri: "http://localhost/bar", location: 10},
					{uri: "http://localhost/bar2", location: 20},
					{uri: "https://localhost/bar3", location: 30},
					{uri: "http://otherhost/bar", location: 40},
					{uri: "http://localhost:90/bar", location: 10},
					{uri: "/bar", location: 10},
					{uri: "bar", location: 10}
				],
				getLinks = function () {
					return linksReturned;
				},
				parser = responseParser({uri: "http://localhost/", linkFinder: {getLinks: getLinks}}),
				actualLinks = parser.getLinks();
			
			expect(actualLinks[0].hasSameOrigin).toEqual(true);
			expect(actualLinks[1].hasSameOrigin).toEqual(true);
			expect(actualLinks[2].hasSameOrigin).toEqual(false);
			expect(actualLinks[3].hasSameOrigin).toEqual(false);
			expect(actualLinks[4].hasSameOrigin).toEqual(false);
			expect(actualLinks[5].hasSameOrigin).toEqual(false);
			expect(actualLinks[6].hasSameOrigin).toEqual(false);
		});
	});
});

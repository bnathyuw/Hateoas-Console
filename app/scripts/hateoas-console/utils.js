var HATEOAS_CONSOLE = HATEOAS_CONSOLE || {};

HATEOAS_CONSOLE.namespace = function (ns_string) {
	"use strict";
	var parts = ns_string.split("."),
		parent = HATEOAS_CONSOLE,
		i;
	
	if (parts[0] === "HATEOAS_CONSOLE") {
		parts = parts.slice(1);
	}
	
	for (i = 0; i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};
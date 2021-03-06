"use strict";

const expect = require("chai").expect;
const os = require("os");
const Helper = require("../../src/helper");

describe("Helper", function() {
	describe("#expandHome", function() {
		it("should correctly expand a Unix path", function() {
			expect([`${os.homedir()}/tmp`, `${os.homedir()}\\tmp`])
				.to.include(Helper.expandHome("~/tmp"));
		});

		it("should correctly expand a Windows path", function() {
			expect(Helper.expandHome("~\\tmp")).to.equal(`${os.homedir()}\\tmp`);
		});

		it("should correctly expand when not given a specific path", function() {
			expect(Helper.expandHome("~")).to.equal(os.homedir());
		});

		it("should not expand paths not starting with tilde", function() {
			expect(Helper.expandHome("/tmp")).to.match(/^\/tmp|[A-Z]:\\tmp$/);
		});

		it("should not expand a tilde in the middle of a string", function() {
			expect(Helper.expandHome("/tmp/~foo"))
				.to.match(/^\/tmp\/~foo|[A-Z]:\\tmp\\~foo$/);
		});

		it("should return an empty string when given an empty string", function() {
			expect(Helper.expandHome("")).to.equal("");
		});

		it("should return an empty string when given undefined", function() {
			expect(Helper.expandHome(undefined)).to.equal("");
		});
	});

	describe("#getVersion()", function() {
		const version = Helper.getVersion();

		it("should mention it is served from source code", function() {
			expect(version).to.include("source");
		});

		it("should include a short Git SHA", function() {
			expect(version).to.match(/\([0-9a-f]{7,11} /);
		});

		it("should include a valid semver version", function() {
			expect(version).to.match(/v[0-9]+\.[0-9]+\.[0-9]+/);
		});
	});
});

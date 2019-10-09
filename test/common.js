const chai = require("chai");

const chaiHttp = require("chai-http");
const app = require("../index");
const _helpers = require("../lib/helpers");

chai.should();
// Configure chai

chai.use(chaiHttp);

module.exports = { chai, chaiHttp, app, _helpers };

/*jshint esnext: true */
'use strict';
var os = require("os");
const STATUS = ["success", "warning", "failure", "error"];
/**
* Unhandled error occured
**/
var stop = function stop(err) {
    console.error(err);
    process.exit(!!err ? 1 : 0);
};
process.on('uncaughtException', stop);
process.on('SIGINT', process.exit);
process.on('exit', stop);

module.exports = {
    write: function (results, done, directoryPath) {
        var machine = new MachineNode(os.hostname());//TODO:Determine status based on scenarios
        var resultsModules = results.modules;
        Object.keys(resultsModules).forEach(function(resultsModuleKey) {
            var resultsModule = resultsModules[resultsModuleKey];
            var scenarioNode = new ScenarioNode(resultsModuleKey);//TODO:Determine status based on tests
            machine.addChildren(scenarioNode);
            var scenarios = [].concat(resultsModule.completed).concat(resultsModule.skipped);
            scenarios.forEach(function(scenario) {
                var index = 0;
                Object.keys(scenario).forEach(function(testKey) {
                    var scenarioTimestamp = scenario.timestamp;
                    var test = scenario[testKey];
                    var time = test.time;
                    var assertions = test.assertions;
                    var testNode = new TestNode(testKey, undefined , index++ ,  guid() , time /*timestamp*/);
                    scenarioNode.addChildren(testNode);
                    Object.keys(assertions).forEach(function(assertionKey) {
                        var assertion = assertions[assertionKey];
                        var reportElement = new ReportElement("assertion", assertion.message, assertion.failure == false ? "success" : "error");
                        testNode.addChildren(reportElement);
                    });
                });
            });
        });
        updateStatus(machine);
        console.log(machine);
        return machine;
    }
};
///
/**
 * Simple Node
 * @author Angel Hermon
 * @param [string] type   [node type]
 * @param [string] name   [node name]
 * @param [string] status [node status
 */
class Node {
    constructor(type, name, status) {
        this.type = type;
        this.name = name;
        this.status = status;
    }
}
class NodeWithChildren extends Node {
    constructor(type, name, status, childrenTypes) {
        super(type, name, status);
        this.childrenTypes = [].concat(childrenTypes);
        this.children = [];
    }
    addChildren(children) {
        var _this = this;
        if (typeof(children) === 'undefined') { return; }
        this.children = this.children.concat([].concat(children).filter(function(child) {
            var add = false;
            _this.childrenTypes.forEach(function(childrenType) {
               add =  (child instanceof childrenType) ? true : add;
            });
            if (!add) {
                console.warn(child + " is not an instance of:" + _this.childrenType.name +
                             " and cannot be added as a child of:" + _this.constructor.name);
            }
            return add;
        }));
    }
}

class MachineNode extends NodeWithChildren{
    constructor(name, status) {
        super("machine", name, status, ScenarioNode);
    }
}
class ScenarioNode extends NodeWithChildren{
    constructor(name, status, scenarioProperties) {
        super("scenario", name, status, TestNode);
        this.scenarioProperties = scenarioProperties;
    }
}
class TestNode extends NodeWithChildren{
    constructor(name, status, index, uid, duration, timestamp) {
        super("test", name, status, [TestNode,ReportElement]);
        this.index     = index;
        this.uid       = uid;
        this.duration  = duration;
        this.timestamp = timestamp;
    }
}
class ReportElement extends Node{
    constructor(type, name, status) {
        super(type, name, status);
    }
}

function updateStatus(node) {
    if(!node.children) {
        return node.status;
    }
    var childrenStatus = node.children.map(function(child) {
        return updateStatus(child);
    });
    console.log(JSON.stringify(childrenStatus));
    var mostSevereStatus = STATUS.success;
    childrenStatus.forEach(function(status) {
        var index = STATUS.indexOf(status);
        mostSevereStatus = mostSevereStatus > index ? mostSevereStatus : index;
    });
    node.status = STATUS[mostSevereStatus];
    return node.status;
}
//move to utils
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

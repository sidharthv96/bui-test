function eventChangeHandler(event) {
  let events = this.eventData();
  console.log(this.event());
  let data = events[this.event()];
  let fields = data.fields;
  this.fields(
    Object.keys(fields).map(field => {
      return {
        value: field,
        label: field
      };
    })
  );
  return true;
}

function fieldChangeHandler(event) {
  let events = this.eventData();

  let field = events[this.event()].fields[this.field()];
  if (!field) {
    return true;
  }
  console.log(field);
  this.fixedValues(field.type == "fixed");
  this.value("");
  if (field.type == "fixed") {
    this.values(
      field.values.map(x => {
        return {
          value: x,
          label: x
        };
      })
    );
  }
  return true;
}

require([
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojmessaging",
  "ojs/ojarraydataprovider",
  "ojs/ojknockout",
  "ojs/ojselectsingle",
  "ojs/ojlabel",
  "ojs/ojformlayout",
  "ojs/ojselectcombobox"
], function(ko, Bootstrap) {
  function DemoModel() {
    this.eventData = ko.observable({
      incidentDummy: {
        label: "Incident Dummy",
        fields: {
          dummy: {
            type: "fixed",
            values: ["Low", "Medium", "High"]
          },
          fakeID: {
            type: "custom"
          }
        }
      }
    });
    const self = this;
    ORACLE_SERVICE_CLOUD.extension_loader
      .load("InvokeActionFromWEbHook")
      .then(extensionProvider => {
        extensionProvider.getGlobalContext().then(globalContext => {
          globalContext.invokeAction("GetEventsList").then(actionData => {
            console.log(actionData);
            self.eventData(actionData.result[0]);
          });
        });
      });
    this.events = ko.computed(function() {
      let events = this.eventData();
      return Object.keys(events).map(event => {
        let d = events[event];
        return {
          value: event,
          label: d.label
        };
      });
    }, this);
    this.event = ko.observable("test");

    this.fields = ko.observableArray([]);
    this.field = ko.observable();

    this.values = ko.observableArray([]);
    this.value = ko.observable();

    this.saveRule = function(event) {
      console.log(this.event());
      console.log(this.field());
      console.log(this.value());
      return true;
    }.bind(this);

    this.fixedValues = ko.observable(false);

    this.eventChangeHandler = eventChangeHandler.bind(this);
    this.fieldChangeHandler = fieldChangeHandler.bind(this);
  }

  Bootstrap.whenDocumentReady().then(function() {
    ko.applyBindings(new DemoModel(), document.getElementById("div1"));
  });
});

function _getCDNPath(paths) {
  var cdnPath = "https://static.oracle.com/cdn/jet/";
  var ojPath = "v8.0.0/default/js/";
  var thirdpartyPath = "v8.0.0/3rdparty/";
  var keys = Object.keys(paths);
  var newPaths = {};

  function _isoj(key) {
    return key.indexOf("oj") === 0 && key !== "ojdnd";
  }
  keys.forEach(function(key) {
    newPaths[key] =
      cdnPath + (_isoj(key) ? ojPath : thirdpartyPath) + paths[key];
  });
  return newPaths;
}

requirejs.config({
  paths: _getCDNPath({
    knockout: "knockout/knockout-3.5.0",
    jquery: "jquery/jquery-3.4.1.min",
    "jqueryui-amd": "jquery/jqueryui-amd-1.12.1.min",
    promise: "es6-promise/es6-promise.min",
    ojs: "min",
    ojL10n: "ojL10n",
    ojtranslations: "resources",
    signals: "js-signals/signals.min",
    text: "require/text",
    hammerjs: "hammer/hammer-2.0.8.min",
    ojdnd: "dnd-polyfill/dnd-polyfill-1.0.1.min",
    touchr: "touchr/touchr",
    customElements: "webcomponents/custom-elements.min"
  }),
  // Shim configurations for modules that do not expose AMD
  shim: {
    jquery: {
      exports: ["jQuery", "$"]
    }
  }
});

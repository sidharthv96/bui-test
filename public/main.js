ORACLE_SERVICE_CLOUD.extension_loader
  .load("InvokeActionFromWEbHook")
  .then(extensionProvider => {
    extensionProvider.getGlobalContext().then(globalContext => {
      globalContext.invokeAction("GetEventsList").then(actionData => {
        console.log(actionData);
        $("#data").text(JSON.stringify(actionData.result));
      });
    });
  });

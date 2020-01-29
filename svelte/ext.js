ORACLE_SERVICE_CLOUD.extension_loader
  .load("NavItem")
  .then(extensionProvider => {
    extensionProvider.getGlobalContext().then(globalContext => {
      globalContext.registerAction("GetEventsList", () => {
        return [
          {
            id: "mercury.helios.ui55.event.chat-created",
            name: "Incident Create",
            fields: {
              severity: {
                type: "fixed",
                values: ["Low", "Medium", "High"]
              },
              productID: {
                type: "custom"
              }
            }
          },
          {
            id: "mercury.helios.ui55.event.chat-updated",
            name: "Incident Update",
            fields: {
              severity: {
                type: "fixed",
                values: ["Low", "Medium", "High"]
              },
              status: {
                type: "fixed",
                values: ["Resolved", "Escalated", "Unresolved"]
              }
            }
          }
        ];
      });
    });
    extensionProvider.registerUserInterfaceExtension(userInterfaceContext => {
      userInterfaceContext
        .getNavigationSetContext()
        .then(navigationSetContext => {
          navigationSetContext
            .getNavigationItem("webhooks-navset-12314233")
            .then(function(nitem) {
              navigationItem = nitem;
              navigationItem.setLabel("Webhooks 3");
              var configureItem = navigationItem.createChildItem();
              configureItem.setLabel("Configure");
              navigationItem.addChildItem(configureItem);
              configureItem.setHandler(function() {
                userInterfaceContext
                  .getContentPaneContext()
                  .then(function(contentPaneContext) {
                    contentPaneContext
                      .createContentPane()
                      .then(function(contentPane) {
                        contentPane.setContentUrl("http://localhost:5005");
                        contentPane.setName("Configure Webhooks");
                      });
                  });
              });
              navigationItem.render();
            });
        });
    });
  });

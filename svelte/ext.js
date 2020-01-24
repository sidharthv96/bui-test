ORACLE_SERVICE_CLOUD.extension_loader
  .load("NavItem")
  .then(extensionProvider => {
    extensionProvider.getGlobalContext().then(globalContext => {
      globalContext.registerAction("GetEventsList", () => {
        return {
          incidentCreate: {
            label: "Incident Create",
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
          incidentUpdate: {
            label: "Incident Update",
            fields: {
              status: {
                type: "fixed",
                values: ["Resolved", "Escalated", "Unresolved"]
              }
            }
          }
        };
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

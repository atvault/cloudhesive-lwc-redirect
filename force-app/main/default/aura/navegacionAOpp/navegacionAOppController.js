({
  invoke : function(component, event, helper) {
    const recordId = component.get("v.recordId");
    if (!recordId) {
      const toast = $A.get("e.force:showToast");
      if (toast) toast.setParams({
        title: "Redirección no disponible",
        message: component.get("v.errorMessage"),
        type: "warning"
      }).fire();
      return;
    }
    try {
      const navService = component.find("navService");
      if (navService) {
        navService.navigate({
          type: 'standard__recordPage',
          attributes: {
            recordId,
            objectApiName: component.get("v.objectApiName") || 'Opportunity',
            actionName: component.get("v.actionName") || 'view'
          }
        });
        return;
      }
    } catch(e){}
    const navToUrl = $A.get("e.force:navigateToURL");
    if (navToUrl) { navToUrl.setParams({ url: '/' + recordId }).fire(); return; }
    try { window.open('/' + recordId, '_self'); } catch(e){}
  }
})
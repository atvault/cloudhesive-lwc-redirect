import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class FlowRedirect extends NavigationMixin(LightningElement) {
  // Defaults ya seteados a tus valores; podés sobreescribirlos en App Builder si querés.
  @api flowApiName = 'ATV_New_Opportunity';
  @api outputVarName = 'oportunityId';

  handleStatusChange(event) {
    if (event.detail.status !== 'FINISHED') return;

    const outs = event.detail.outputVariables || [];
    const idVar = outs.find(v => v.name === this.outputVarName);
    const oppId = idVar && idVar.value;
    if (!oppId) return;

    // Navegación oficial a la record page estándar
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: oppId,
        objectApiName: 'Opportunity',
        actionName: 'view'
      }
    });
  }
}
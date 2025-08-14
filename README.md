
## Flow Redirect Wrapper – README

### Objetivo

* Reemplazar el botón **New** estándar de Oportunidad por una experiencia personalizada.
* Ejecutar el Flow `ATV_New_Opportunity` al hacer clic en **New**.
* Al terminar el flow (*Finish*), redirigir automáticamente al usuario a la página de la Oportunidad creada.
* Evitar que el Flow reinicie por defecto al terminar.

### Cómo funciona

1. **LWC `flowRedirect`**

   * Utiliza el componente estándar `<lightning-flow>` con el atributo `onstatuschange`.
   * Escucha cuando el Flow finaliza (estado `FINISHED`) y captura la variable de salida `oportunityId`.
   * Con `NavigationMixin.Navigate`, redirige a la página del registro creado `standard__recordPage`.
   * Esto permite controlar el comportamiento del botón *Finish* y evitar el reinicio por defecto.
     ([Salesforce Developers][1], [Salesforce Developers][2])

2. **Aura wrapper (`FlowNewOverride`)**

   * Componente Aura que implementa `lightning:actionOverride`.
   * Envuelve el LWC `flowRedirect`.
   * Permite reemplazar el comportamiento del botón estándar *New*.
     ([Salesforce Developers][3], [Salesforce Developers][4], [Salesforce Reader][5], [Salesforce Stack Exchange][6])

3. **Override del botón "New"**

   * En **Object Manager → Opportunity → Buttons, Links, and Actions**, se elige *Override* del botón *New* y se selecciona el componente Aura `FlowNewOverride`.
   * Esto hace que, desde el List View o desde la pestaña Oportunidades, al hacer clic en *New*, se ejecute el Flow personalizado en vez del formulario estándar.
     ([Salesforce Developers][4], [Salesforce Developers][7])

4. **Flow `ATV_New_Opportunity`**

   * Crea una Oportunidad, y asigna su Id a la variable `oportunityId`.
   * La variable está configurada como **Available for output** para que el LWC la capture al finalizar.
   * Lo que hace el LWC es detectar ese Id y navegar hacia el registro, evitando que el flow reinicie en primer screen.

### Resumen de arquitectura

```
[Lista Oportunidades] --(Click New)--> [Override via Aura wrapper] -->
[FlowRedirect LWC embebido] --(Finish Flow)--> captura opportunityId y redirige.
```

### Ventajas del enfoque

* Totalmente soportado por Salesforce: usando `lightning:actionOverride`, `lightning-flow` con `onstatuschange`, y `NavigationMixin`.
* UX consistente: el usuario no ve un reinicio del Flow al terminar; lo lleva directo a la página creada.
* Modular y mantenible: el Flow y los componentes están separados y versionados, ideales para deployment.

---

## Referencias

* **Controlar qué sucede cuando un Flow termina**, usando LWC con `onstatuschange` y `NavigationMixin`
  ([Salesforce Reader][5], [Salesforce Developers][1])

* **Override de botones estándar (incluido New)** mediante Aura components
  ([Salesforce Developers][4])

* Uso de `<lightning-flow>` dentro de LWC para embebed y control del finish
  ([Salesforce Developers][2])

---

### Próximos pasos

* Verificar en QA/Producción que el override está activo y que al hacer **New** ejecuta el Flow correctamente.
* Probar distintos escenarios: con usuario sin permisos, cancela el flow, error en la navegación, etc.
* Documentar en tu repo/Confluence este README, junto con comandos `sf project retrieve` y `deploy` que usaste.

---

Si querés, puedo ayudarte a armar un diagrama visual (en Markdown, ASCII o estilo Mermaid) para que entiendan el “flow” del proceso o generar un checklist para QA.

[1]: https://developer.salesforce.com/docs/platform/lwc/guide/use-flow-embed-control-finish-example.html?utm_source=chatgpt.com "Control What Happens When a Flow Interview Finishes"
[2]: https://developer.salesforce.com/docs/platform/lwc/guide/use-flow-embed-create-start.html?utm_source=chatgpt.com "Create and Start a Flow in a Custom Lightning Web Component"
[3]: https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_using_flow_onfinish.htm?utm_source=chatgpt.com "Control a Flow’s Finish Behavior by Wrapping ... - Salesforce Developers"
[4]: https://developer.salesforce.com/docs/atlas.en-us.lightning.meta.%20%20/lightning/components_using_lex_s1_action_overrides.htm?utm_source=chatgpt.com "Override Standard Actions with Aura Components - Salesforce Developers"
[5]: https://www.salesforcereader.com/2025/04/override-standard-button-using.html?utm_source=chatgpt.com "Override Standard Button Using Lightning Web Component (LWC) : Bijay Kumar"
[6]: https://salesforce.stackexchange.com/questions/273290/overriding-new-with-a-lightning-aura-component-there-is-a-way-to-make-a-popup?utm_source=chatgpt.com "button overrides - Overriding \"New\" with a lightning aura component ..."
[7]: https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_using_lex_s1_action_overrides_create.htm?utm_source=chatgpt.com "Override a Standard Action with an Aura Component - Salesforce Developers"

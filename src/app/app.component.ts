import {Component, ErrorHandler} from '@angular/core';
import {AuthService} from "./auth.service";
import {environment} from "../environments/environment";
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {AngularPlugin} from "@microsoft/applicationinsights-angularplugin-js";

@Component({
    selector: 'app-root', templateUrl: 'app.component.html'
})
export class AppComponent {
    appInsights: ApplicationInsights;
    private angularPlugin = new AngularPlugin();

    constructor(public authService: AuthService,) {
        if (environment.instrumentationKey != null) {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: environment.instrumentationKey, enableAutoRouteTracking: true, // option to log all route changes
                    extensionConfig: {
                        [this.angularPlugin.identifier]: {
                            errorServices: [new ErrorHandler()],
                        },
                    },
                }
            });
            this.appInsights.loadAppInsights();
        }
    }
}

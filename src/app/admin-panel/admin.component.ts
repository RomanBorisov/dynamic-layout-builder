import { Component, ViewEncapsulation } from '@angular/core';
import { GridBuilderComponent } from './grid-builder/grid-builder.component';
import { GridConfigFormComponent } from './grid-config-form/grid-config-form.component';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin.component.html',
    standalone: true,
    imports: [
        GridConfigFormComponent,
        GridBuilderComponent
    ],
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class AdminPanelComponent {

}

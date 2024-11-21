import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { AppUtils } from '../states/app-utils';
import { WidgetsState } from '../states/widgets.state';
import { WidgetService } from '../services/widget.service';

@Component({
    selector: 'app-grid-config-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './grid-config-form.component.html',
    styleUrls: ['./grid-config-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GridConfigFormComponent implements OnInit {
    public form!: UntypedFormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _gridBuilderState: WidgetsState,
        private _widgetService: WidgetService
    ) {
    }

    public ngOnInit() {
        this.form = this._formBuilder.group({
            name: [''],
            id: [AppUtils.guid()],
            color: [AppUtils.generateRandomColor()],
        });
    }

    public submit() {
        this._widgetService.addWidget(this.form.value).subscribe((widget) => {
            this._gridBuilderState.addWidget(this.form.value);

            this.form.setValue(this._generateWidget());
        });
    }

    private _generateWidget() {
        return {
            name: '',
            id: AppUtils.guid(),
            color: AppUtils.generateRandomColor()
        };
    }
}

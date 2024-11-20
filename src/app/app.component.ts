import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WidgetsState } from './admin-panel/states/widgets.state';
import { WidgetService } from './admin-panel/services/widget.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterOutlet, RouterLinkActive],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(
        private _gridBuilderState: WidgetsState,
        private _widgetService: WidgetService
    ) {
    }

    public ngOnInit() {
        this._widgetService.getWidgets().subscribe((widgets) => {
            this._gridBuilderState.initWidgets(widgets);
        });
    }
}

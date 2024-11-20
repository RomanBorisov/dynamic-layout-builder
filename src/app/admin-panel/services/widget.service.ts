import { Injectable } from '@angular/core';
import { RestService } from '../../core/services/rest.service';
import { Observable } from 'rxjs';
import { IWidget } from '../states/widgets.state';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    constructor(
        private _restService: RestService,
    ) {
    }

    public getWidgets(): Observable<IWidget[]> {
        return this._restService.restGET('widgets');
    }

    public removeWidget(widget: IWidget): Observable<void> {
        return this._restService.restDELETE(`widgets/${widget.id}`);
    }

    public addWidget(widget: IWidget): Observable<IWidget> {
        return this._restService.restPOST('widgets', widget);
    }

    public updateWidget(widget: IWidget): Observable<IWidget> {
        return this._restService.restPUT(`widgets/${widget.id}`, widget);
    }
}

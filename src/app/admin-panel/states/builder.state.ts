import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWidget } from './widgets.state';
import { WidgetService } from '../services/widget.service';

@Injectable({
    providedIn: 'root'
})
export class BuilderState {
    private _selectedWidget$ = new BehaviorSubject<IWidget | null>(null);

    public selectedWidget$ = this._selectedWidget$.asObservable();

    constructor(
        private _widgetsService: WidgetService
    ) {
    }

    public selectWidget(widget: IWidget): void {
        this._selectedWidget$.next(this._selectedWidget$.value === widget
            ? null
            : widget);
    }

    public setPoint(row: number, col: number): void {
        const selectedWidget = this._selectedWidget$.value;

        if (!selectedWidget) {
            return;
        }

        if (!selectedWidget.startPoint) {
            this._selectedWidget$.next({
                ...selectedWidget,
                startPoint: { row, col },
            });
        } else if (!selectedWidget.endPoint) {
            this._selectedWidget$.next({
                ...selectedWidget,
                endPoint: { row, col },
            });

            this._widgetsService.updateWidget({
                ...selectedWidget,
                endPoint: { row, col },
            }).subscribe();
        } else {
            this._selectedWidget$.next({
                ...selectedWidget,
                startPoint: { row, col },
                endPoint: null,
            });
        }
    }
}

export interface IPoint {
    row: number;
    col: number;
}

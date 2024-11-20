import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPoint } from './builder.state';

@Injectable({
    providedIn: 'root'
})
export class WidgetsState {
    public widgets$: BehaviorSubject<IWidget[]> = new BehaviorSubject<IWidget[]>([]);

    public addWidget(widget: IWidget) {
        this.widgets$.next([...this.widgets$.value, widget]);
    }

    public removeWidget(id: string) {
        const widgetsAfterRemoval = this.widgets$.value.filter(widget => widget.id !== id);

        this.widgets$.next(widgetsAfterRemoval);
    }

    public initWidgets(widgets: IWidget[]) {
        this.widgets$.next(widgets);
    }
}

export interface IWidget {
    id: string;
    name: string;
    startPoint: IPoint | null;
    endPoint: IPoint | null;
    color: string;
}

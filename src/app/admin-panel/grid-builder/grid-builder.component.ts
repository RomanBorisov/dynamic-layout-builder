import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { BuilderState } from '../states/builder.state';
import { IWidget, WidgetsState } from '../states/widgets.state';
import { AsyncPipe, NgForOf, NgStyle } from '@angular/common';
import { WidgetService } from '../services/widget.service';
import { AppUtils } from '../states/app-utils';

@Component({
    selector: 'app-grid-builder',
    templateUrl: './grid-builder.component.html',
    styleUrls: ['./grid-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AsyncPipe,
        NgStyle,
        NgForOf
    ],
    host: {
        class: 'grid-builder'
    }
})
export class GridBuilderComponent implements OnInit {
    public rows = Array.from({ length: 6 }); // Генерация массива для 6 строк

    public cols = Array.from({ length: 6 }); // Генерация массива для 6 столбцов

    public addedWidgets$!: Observable<IWidget[]>;

    public selectedWidget$!: Observable<IWidget | null>;

    private widgetColors: Map<string, string> = new Map();

    constructor(
        private _gridBuilderState: WidgetsState,
        private _builderState: BuilderState,
        private _widgetService: WidgetService
    ) {
    }

    public ngOnInit(): void {
        this.addedWidgets$ = this._gridBuilderState.widgets$;
        this.selectedWidget$ = this._builderState.selectedWidget$;

        this.selectedWidget$.subscribe(console.log)

        this.addedWidgets$.subscribe((widgets) => {
            widgets.forEach((widget) => {
                if (!this.widgetColors.has(widget.id)) {
                    this.widgetColors.set(widget.id, AppUtils.generateRandomColor());
                }
            });
        });
    }

    public selectCell(row: number, col: number): void {
        this._builderState.setPoint(row, col);
    }

    public removeWidget(event: Event, widget: IWidget): void {
        event.stopPropagation();
        this._widgetService.removeWidget(widget).subscribe(() => {
            this._gridBuilderState.removeWidget(widget.id);
        });
    }

    public selectWidget(widget: IWidget): void {
        this._builderState.selectWidget(widget);
    }

    public getWidgetColor(row: number, col: number): string | null {
        let color = null;

        this.addedWidgets$.subscribe((widgets) => {
            widgets.forEach((widget) => {
                if (
                    widget.startPoint &&
                    widget.endPoint &&
                    row >= Math.min(widget.startPoint.row, widget.endPoint.row) &&
                    row <= Math.max(widget.startPoint.row, widget.endPoint.row) &&
                    col >= Math.min(widget.startPoint.col, widget.endPoint.col) &&
                    col <= Math.max(widget.startPoint.col, widget.endPoint.col)
                ) {
                    color = widget.color ?? null;
                }
            });
        });

        return color;
    }


    public getBackgroundColor(color: string, opacity: number): string {
        if (color.startsWith('#')) {
            // Если цвет в HEX, преобразуем его в RGBA
            return this.hexToRgba(color, opacity);
        } else if (color.startsWith('rgb')) {
            // Если цвет уже в формате rgb или rgba, добавляем прозрачность
            return this.modifyRgbaOpacity(color, opacity);
        } else {
            // Если цвет задан в текстовом формате (e.g., "red"), добавляем прозрачность с помощью rgba
            return `rgba(${this.textColorToRgb(color)}, ${opacity})`;
        }
    }

    private hexToRgba(hex: string, opacity: number): string {
        hex = hex.replace('#', '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    private modifyRgbaOpacity(rgba: string, opacity: number): string {
        // Если цвет уже содержит прозрачность (rgba), заменяем ее
        if (rgba.startsWith('rgba')) {
            return rgba.replace(/rgba?\((.+),[\s]*[\d.]+\)/, `rgba($1, ${opacity})`);
        }
        // Если это rgb, добавляем прозрачность
        return rgba.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }

    private textColorToRgb(color: string): string {
        // Создаем временный элемент для вычисления RGB цвета из текстового формата
        const tempDiv = document.createElement('div');
        tempDiv.style.color = color;
        document.body.appendChild(tempDiv);

        const rgb = getComputedStyle(tempDiv).color; // Получаем вычисленный цвет в формате "rgb(r, g, b)"
        document.body.removeChild(tempDiv);

        return rgb.replace('rgb(', '').replace(')', '');
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WidgetService } from '../admin-panel/services/widget.service';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { IWidget } from '../admin-panel/states/widgets.state';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [
        HeaderComponent,
        NavigationComponent,
        MainComponent,
        FooterComponent,
        AsyncPipe
    ],
    encapsulation: ViewEncapsulation.None

})
export class LayoutComponent implements OnInit {
    public rowsNum = 6;

    public colsNum = 6;

    public tableForGridArea$!: Observable<string>;

    constructor(
        private _widget: WidgetService
    ) {
    }

    public ngOnInit() {
        this.tableForGridArea$ = this._widget.getWidgets().pipe(
            map((widgets) => this._generateGridTemplateAreas(widgets, this.rowsNum, this.colsNum).join(' '))
        );
    }

    private _generateGridTemplateAreas(widgets: IWidget[], rows: number, cols: number): string[] {
        // Создаем пустую сетку с заданными размерами и заполняем её значением "empty"
        const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill('empty'));

        // Заполняем сетку именами виджетов
        widgets.forEach((widget) => {
            const { name, startPoint, endPoint } = widget;

            for (let row = startPoint!.row; row <= endPoint!.row; row++) {
                for (let col = startPoint!.col; col <= endPoint!.col; col++) {
                    grid[row][col] = name;
                }
            }
        });

        // Преобразуем каждую строку сетки в строку с пробелами
        return grid.map((row) => `"${row.join(' ')}"`);
    }

}

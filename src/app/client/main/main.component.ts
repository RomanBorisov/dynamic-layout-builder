import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'main'
    }
})
export class MainComponent {

}

import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'navigation'
    }
})
export class NavigationComponent {




}

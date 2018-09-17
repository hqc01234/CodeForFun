import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationComponent {
    public matPanelHeaderHeight = '44px';
}

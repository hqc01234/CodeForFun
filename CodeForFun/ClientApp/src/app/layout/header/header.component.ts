import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    constructor(private _layoutService: LayoutService) {
    }

    public toggleSideNav() {
        this._layoutService.isSideNavMini$.next(!this._layoutService.isSideNavMini$.value);
    }
}

import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { MatSidenav } from '@angular/material';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements AfterViewInit {

    @ViewChild('sideNav')
    private _matSideNav: MatSidenav;

    @ViewChild('matSidenavContainer', { read: ElementRef })
    set sideNavContainer(elr: ElementRef) {
        this._sideNavContainer = elr.nativeElement;
    }

    @ViewChild('sideNav', { read: ElementRef })
    set sideNav(elr: ElementRef) {
        this._sideNav = elr.nativeElement;
    }

    private _sideNav: HTMLElement;
    private _sideNavContainer: HTMLElement;
    private _isSideNavMini: boolean;
    private _isHandset: boolean;

    constructor(
        public layoutService: LayoutService
    ) {
    }

    public ngAfterViewInit() {
        this.layoutService.isSideNavMini$.subscribe((isSideNavMini) => {
            this._isSideNavMini = isSideNavMini;
            this._toggleSideNav();
        });

        this.layoutService.isHandset$.subscribe((isHandset) => {
            this._isHandset = isHandset;
            this._toggleCssClasses();
        });
    }

    private _toggleSideNav() {
        if (this._isHandset) {
            this._matSideNav.toggle();
        } else {
            this._toggleCssClasses();
        }
    }

    private _toggleCssClasses() {
        if (!this._sideNavContainer || !this._sideNav) {
            return;
        }

        this.layoutService.toogleCssClassesIf(this._sideNavContainer, this._isSideNavMini, ['sidenav-mini']);
        this.layoutService.toogleCssClassesIf(this._sideNavContainer, this._isHandset, ['sidenav-handset']);
        this.layoutService.toogleCssClassesIf(this._sideNav, this._isHandset, ['d-none']);
        this.layoutService.toogleCssClassesIf(this._sideNav, this._isHandset, ['d-block'], 500);
    }
}

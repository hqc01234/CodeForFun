import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutService {

    public isSideNavMini$ = new BehaviorSubject(true);
    public isHandset$: Observable<boolean>;

    constructor(private _breakpointObserver: BreakpointObserver) {
        this.isHandset$ = this._breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    }

    public toogleCssClassesIf(element: HTMLElement, isAdd: boolean, cssClasses: Array<string>, timeout = 0) {
        const toggleClasses = () => {
            if (isAdd) {
                element.classList.add(...cssClasses);
            } else {
                element.classList.remove(...cssClasses);
            }
        };

        if (timeout > 0) {
            setTimeout(() => { toggleClasses(); }, timeout);
        } else {
            toggleClasses();
        }
    }
}

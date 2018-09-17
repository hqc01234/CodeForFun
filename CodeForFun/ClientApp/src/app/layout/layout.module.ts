import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutService } from './services/layout.service';
import { SideNavHoverDirective } from './directives/sidenav-hover.directive';

import {
    MatGridListModule, MatCardModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatToolbarModule,
    MatSidenavModule, MatListModule, MatInputModule,
    MatExpansionModule, MatRippleModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

const layoutComponents = [
    LayoutComponent,
    SideNavigationComponent,
    HeaderComponent,
    FooterComponent,
    SideNavHoverDirective
];

const materailModules = [
    MatGridListModule, MatCardModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatToolbarModule,
    MatSidenavModule, MatListModule, MatInputModule,
    MatExpansionModule, MatRippleModule, LayoutModule
];

@NgModule({
    declarations: [
        ...layoutComponents
    ],
    imports: [
        CommonModule,
        ...materailModules
    ],
    exports: [
        ...layoutComponents,
        ...materailModules
    ],
    providers: [
        LayoutService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppLayoutModule { }

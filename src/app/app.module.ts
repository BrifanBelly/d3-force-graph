import { LinkComponent } from './components/link.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ZoomableDirective } from './d3/directives/zoom.directive';
import { DraggableDirective } from './d3/directives/drag.directive';
import { Menu1Component } from './components/menu1.component';
import { LabelComponent } from './components/label.component';
import { Menu2Component } from './components/menu2.component';
import { Menu3Component } from './components/menu3.component';
import { MenuClickService, BottomSheetOverviewExampleSheet, DialogOverviewExampleDialog } from './menu-click.service';
import { NodeComponent } from './components/node.component';
import { Menu4Component } from './components/menu4.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkComponent,
    NodeComponent,
    ZoomableDirective,
    DraggableDirective,
    Menu1Component,
    Menu2Component,
    Menu3Component,
    Menu4Component,
    LabelComponent,
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AngularFontAwesomeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [MenuClickService],
  bootstrap: [AppComponent],
  entryComponents: [BottomSheetOverviewExampleSheet, DialogOverviewExampleDialog]
})
export class AppModule { }

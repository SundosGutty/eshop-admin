import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AdminToastMessageComponent } from './components/user-toats/toast-message.component';
import { AdminConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AdminCardHeaderComponent } from './components/card-header/card-header.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { AdminFormBaseTemplateComponent } from './components/form-template/form-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryNamePipe } from './pipes/country-name.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    GalleryComponent,
    AdminToastMessageComponent,
    AdminConfirmDialogComponent,
    AdminCardHeaderComponent,
    DynamicTableComponent,
    AdminFormBaseTemplateComponent, CountryNamePipe
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [CommonModule, SidebarComponent, RouterModule, GalleryComponent, AdminToastMessageComponent, AdminConfirmDialogComponent, AdminCardHeaderComponent, DynamicTableComponent, AdminFormBaseTemplateComponent, CountryNamePipe],

})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
// Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SigninComponent, SigninFormComponent } from './signin/signin.component';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
import { SettingsComponent, SettingsFormComponent } from './settings/settings.component';
import { ModalComponent, ModalContentComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SigninComponent,
    SigninFormComponent,
    CardComponent,
    CommentComponent,
    SettingsComponent,
    SettingsFormComponent,
    ModalComponent,
    ModalContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ToolbarComponent,
    SigninComponent,
    CardComponent,
    CommentComponent,
    SettingsComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }

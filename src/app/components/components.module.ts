import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
// Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SigninComponent, SigninFormComponent } from './signin/signin.component';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
import { SettingsComponent } from './settings/settings.component';
import { CropperComponent } from './cropper/cropper.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SigninComponent,
    SigninFormComponent,
    CardComponent,
    CommentComponent,
    SettingsComponent,
    CropperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ToolbarComponent,
    SigninComponent,
    CardComponent,
    CommentComponent,
    SettingsComponent,
    CropperComponent
  ]
})
export class ComponentsModule { }

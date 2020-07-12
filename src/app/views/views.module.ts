import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
// Components
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { CreateComponent } from './create/create.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    CreateComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class ViewsModule { }

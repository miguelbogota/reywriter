import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './views/create/create.component';
import { PostComponent } from './views/post/post.component';
import { ErrorComponent } from './views/error/error.component';
import { IsReiGuard } from './core/guards/is-rei.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent, canActivate: [IsReiGuard] },
  { path: 'post/:postId', component: PostComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

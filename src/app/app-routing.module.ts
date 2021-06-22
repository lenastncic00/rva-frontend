import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { StatusComponent } from './components/status/status.component';
import {DepartmanComponent } from './components/departman/departman.component';
import {FakultetComponent } from './components/fakultet/fakultet.component';
import {StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/core/home/home.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'author', component: AuthorComponent },
{ path: 'status', component: StatusComponent },
{ path: 'departman', component: DepartmanComponent },
{ path: 'fakultet', component: FakultetComponent },
{ path: 'student', component: StudentComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

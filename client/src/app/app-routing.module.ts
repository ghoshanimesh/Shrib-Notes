import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { nanoid } from 'nanoid';


const routes: Routes = [
  { path: ':id', component: NotesComponent},
  { path: '', redirectTo: '/'+nanoid(20), pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { CdListComponent } from './cd-list/cd-list.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'cd', component: CdListComponent},
  {path: 'book', component: BookListComponent},
  {path: 'dvd', component: DvdListComponent},
  {path: 'contact', component: ContactListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

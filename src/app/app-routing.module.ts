import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [{ path: 'chat', redirectTo: '', pathMatch: 'full'},
{ path: '', component: CustomerSupportComponent  },]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  HeaderComponent,
  HeaderComponent
]

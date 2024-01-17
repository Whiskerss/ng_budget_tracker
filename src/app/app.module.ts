import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './components/add-form/add-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './globals/global';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SummaryStatsComponent } from './components/summary-stats/summary-stats.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddFormComponent,
    DataTableComponent,
    SummaryStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent],
})
export class AppModule {}

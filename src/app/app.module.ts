import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { HttpClientModule } from '@angular/common/http';

//services 
import { accountService } from './service/account.service';
import { projectService } from './service/project.service';
import { taskService } from './service/task.service';

//Global
import { GlobalService } from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
  ],
  providers: [
    accountService,
    projectService,
    taskService,
    GlobalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

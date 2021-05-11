import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { TaskComponent } from './examples/task/task.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { VisualComponent } from './examples/visual/visual.component';
import { ScheduleComponent } from './examples/schedule/schedule.component';
import { BudgetComponent } from './examples/budget/budget.component';
import { ProjectComponent } from './examples/project/project.component';

const routes: Routes =[
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'task',             component: TaskComponent },
    { path: 'project',             component: ProjectComponent },
    { path: 'visual-board',             component: VisualComponent },
    { path: 'schedule',             component: ScheduleComponent },
    { path: 'budget',             component: BudgetComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

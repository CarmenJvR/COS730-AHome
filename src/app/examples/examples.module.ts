import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TaskComponent } from './task/task.component';
import { VisualComponent } from './visual/visual.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BudgetComponent } from './budget/budget.component';
import { ProjectComponent } from './project/project.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        TaskComponent,
        VisualComponent,
        ScheduleComponent,
        BudgetComponent,
        ProjectComponent
    ]
})
export class ExamplesModule { }

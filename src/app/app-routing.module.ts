//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
//Components
///Classes
import { EditClassComponent } from './classes/edit-class/edit-class.component';
import { ClassesContainerComponent } from './classes/classes-container/classes-container.component'
///Courses
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewCoursesComponent } from './courses/view-courses/view-courses.component';
///Professors
import { AddProfessorComponent } from './professors/add-professor/add-professor.component';
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component';
import { ViewProfessorsComponent } from './professors/view-professors/view-professors.component';
///Restrictions
import { AddRestrictionComponent } from './professors/add-restriction/add-restriction.component';
///Home
import { HomeComponent } from './home/home.component';
///Navbar
import { NavbarComponent } from './navbar/navbar.component';
///Users
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
///Requests
import { ViewRequestsComponent } from './requests/view-requests/view-requests.component';
import { RequestAccessComponent } from './requests/request-access/request-access.component';
///Semesters
import { AddSemesterComponent } from './semesters/add-semester/add-semester.component';
///Schedules
import { SchedulesTableComponent } from './schedules/schedules-table/schedules-table.component';

/**
 * Routes for the system navigation.
 */
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'navbar', component: NavbarComponent},

    {path: 'classes', component: ClassesContainerComponent},
    {path: 'edit-class/:id', component: EditClassComponent},

    {path: 'add-course', component: AddCourseComponent},
    {path: 'edit-course/:id', component: EditCourseComponent},
    {path: 'view-courses', component: ViewCoursesComponent},
    
    {path: 'add-professor', component: AddProfessorComponent},
    {path: 'add-restriction/:id', component: AddRestrictionComponent },
    {path: 'edit-professor/:id', component: EditProfessorComponent},
    {path: 'view-professors', component: ViewProfessorsComponent},

    {path: 'view-users', component: ViewUsersComponent},
    {path: 'add-user', component: AddUserComponent},
    
    {path: 'request-access', component: RequestAccessComponent},
    {path: 'view-requests', component: ViewRequestsComponent},

    {path: 'add-semester', component: AddSemesterComponent },

    {path: 'schedules-table', component: SchedulesTableComponent}

];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
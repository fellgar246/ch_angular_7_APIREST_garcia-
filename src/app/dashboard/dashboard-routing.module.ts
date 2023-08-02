import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then((module) => module.UsersModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((module) => module.CoursesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((module) => module.CategoriesModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule {}

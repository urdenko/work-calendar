import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileHistoryComponent } from './components/profile-history/profile-history.component';
import { ProfilePageComponent } from './components/profile-page.component';
import { ProfileProjectsComponent } from './components/profile-projects/profile-projects.component';
import { ProfileSubscriptionsComponent } from './components/profile-subscriptions/profile-subscriptions.component';

const components = [
  ProfilePageComponent,
  ProfileHistoryComponent,
  ProfileSubscriptionsComponent,
  ProfileFormComponent,
  ProfileProjectsComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class ProfileModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from '../heroes/heroes.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HeroDetailComponent }  from '../hero-detail/hero-detail.component';
import { HeroNewComponent }  from '../hero-new/hero-new.component';
import { WeaponsComponent } from '../weapons/weapons.component';
import { WeaponDetailsComponent } from '../weapon-details/weapon-details.component';
import { WeaponNewComponent } from '../weapon-new/weapon-new.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero-detail/:id', component: HeroDetailComponent },
  { path: 'new-hero', component: HeroNewComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapon-detail/:id', component: WeaponDetailsComponent },
  { path: 'new-weapon', component: WeaponNewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RentalCheckoutComponent } from './components/rental-checkout/rental-checkout.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "", pathMatch:"full", component: CarDetailsComponent },
  {path: "cars", component: CarDetailsComponent },
  {path: "cars/car/:carId", component: CarDetailComponent },
  {path: "rentals", component: RentalComponent },
  {path: "rentals/checkout", component: RentalCheckoutComponent },
  {path: "admin/customers", component: CustomerComponent },
  {path: "admin/cars", component: CarComponent, canActivate:[LoginGuard] },
  {path: "admin/cars/add", component: CarAddComponent, canActivate:[LoginGuard] },
  {path: "admin/cars/update/:carId", component: CarUpdateComponent, canActivate:[LoginGuard]},
  {path: "admin/colors", component: ColorComponent, canActivate:[LoginGuard] },
  {path: "admin/colors/add", component: ColorAddComponent, canActivate:[LoginGuard] },
  {path: "admin/colors/update/:colorId", component: ColorUpdateComponent, canActivate:[LoginGuard] },
  {path: "admin/brands", component: BrandComponent, canActivate:[LoginGuard] },
  {path: "admin/brands/add", component: BrandAddComponent, canActivate:[LoginGuard] },
  {path: "admin/brands/update/:brandId", component: BrandUpdateComponent, canActivate:[LoginGuard] },
  {path: "login", component:LoginComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

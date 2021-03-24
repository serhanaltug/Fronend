import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalCheckoutComponent } from './components/rental-checkout/rental-checkout.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path: "", pathMatch:"full", component: CarComponent },
  {path: "cars", component: CarComponent },
  {path: "cars/brand/:brandId", component: CarComponent },
  {path: "cars/color/:colorId", component: CarComponent },
  {path: "cars/car/:carId", component: CarDetailComponent },
  {path: "customers", component: CustomerComponent },
  {path: "rentals", component: RentalComponent },
  {path: "rentals/checkout", component: RentalCheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

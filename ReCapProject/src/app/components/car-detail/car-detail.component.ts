import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: CarDetail;
  carImages:CarImage[] = [];
  dataLoaded = false;
  imageDataLoaded = false;
  rentable:string = "disabled";
  beginDate:string = new Date().toLocaleDateString('en-CA');
  endDate:string = new Date().toLocaleDateString('en-CA');
  rental:Rental;

  constructor(private carService:CarService, private carImageService:CarImageService, private rentalService:RentalService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCar(params["carId"]);
        this.getCarImages(params["carId"]);
      }
    })
  }

  checkRental(car:CarDetail){

    this.rental = { id:0, carId: car.carId, customerId: 2, customerName:"", rentDate: this.beginDate, returnDate: this.endDate, carName: this.car.carName, brandName: this.car.brandName };

    this.rentalService.checkRental(this.rental).subscribe(response => {
      if(response.success){
        this.toastrService.success(car.carName + " " + response.message);
        this.rentable = "";
      }
      else
      {
        this.toastrService.error("Kiralanamadı", "Kiralamaya çalıştığınız " + car.carName + " seçitiğiniz tarihler arasında kiralanamaz." + response.message);
        this.rentable = "disabled";
      }
    })
  }

  checkout(){
    this.rentalService.setCheckOut(this.rental);
    this.router.navigateByUrl('/rentals/checkout');
  }

  getCar(carId:number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.car = response.data;
      this.dataLoaded = true;
    })
  }

  getCarImages(carId:number) {
    this.carImageService.getCarImages(carId).subscribe(response => {
      this.carImages = response.data;
      this.imageDataLoaded = true;
    })
  }

}

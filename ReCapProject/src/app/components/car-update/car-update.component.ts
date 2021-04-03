import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car: Car;
  brands:Brand[] = [];
  colors:Color[] = [];
  carUpdateForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private carService:CarService,private brandService:BrandService, private colorService:ColorService, 
    private toastrService:ToastrService, 
    private router:Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.createCarUpdateForm();

    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCar(params["carId"]);
      }
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  
  getCar(carId:number) {
    this.carService.getCar(carId).subscribe(response => {
      this.car = response.data;
      this.setCar();
    })
  }

  setCar(){
    this.carUpdateForm.setValue({
      id: this.car.id,
      name: this.car.name,
      description: this.car.description,
      brandId: this.car.brandId,
      colorId: this.car.colorId,
      modelYear: this.car.modelYear,
      dailyPrice: this.car.dailyPrice
    })
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      colorId: [Number, Validators.required],
      brandId: [Number, Validators.required],
      modelYear: [Number, Validators.required],
      dailyPrice: [Number, Validators.required]
    })    
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(['/admin/cars']);
      },responseError => {
        if(responseError.error.Errors.lenght>0){
          for(let i = 0; i < responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata!");
          }
        }
      });
    }
    else
    {
      this.toastrService.error("Formunuz eksik", "Dikkat!");
    }
  }
}

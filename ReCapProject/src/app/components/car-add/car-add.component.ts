import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[] = [];
  colors:Color[] = [];
  carAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private carService:CarService, private brandService:BrandService, private colorService:ColorService, 
    private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
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
  
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carName:["", Validators.required],
      carDescription:[""],
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      modelYear:[Number, Validators.required],
      dailyPrice:[Number, Validators.required]
    })    
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.id=0;
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.add(carModel).subscribe(response => {
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

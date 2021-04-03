import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand: Brand;
  brandUpdateForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, 
    private router:Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getBrand(params["brandId"]);
      }
    })
  }
  
  getBrand(brandId:number) {
    this.brandService.getBrand(brandId).subscribe(response => {
      this.brand = response.data;
      this.setBrand();
    })
  }

  setBrand(){
    this.brandUpdateForm.setValue({
      id: this.brand.id,
      name: this.brand.name,
    })
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id:[''],
      name:['', Validators.required],
    })    
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(['/admin/brands']);
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

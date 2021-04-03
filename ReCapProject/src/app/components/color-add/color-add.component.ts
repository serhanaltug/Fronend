import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:["", Validators.required],
    })    
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(['/admin/colors']);
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
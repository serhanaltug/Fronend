import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color: Color;
  colorUpdateForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, 
    private router:Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getColor(params["colorId"]);
      }
    })
  }
  
  getColor(colorId:number) {
    this.colorService.getColor(colorId).subscribe(response => {
      this.color = response.data;
      console.log(this.color);
      this.setColor();
    })
  }

  setColor(){
    this.colorUpdateForm.setValue({
      id: this.color.id,
      name: this.color.name,
    })
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id:[''],
      name:['', Validators.required],
    })    
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response => {
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

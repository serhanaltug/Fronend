import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-checkout',
  templateUrl: './rental-checkout.component.html',
  styleUrls: ['./rental-checkout.component.css']
})
export class RentalCheckoutComponent implements OnInit {

  rental:Rental;

  constructor(private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.rental = this.rentalService.getCheckOut();
  }

  completeCheckOut(){
    this.rentalService.checkRental(this.rental).subscribe(response1 => {
      if(response1.success){
        this.rentalService.addRental(this.rental).subscribe(response2 => {
          if(response2.success){
            this.toastrService.success("Kiralandı", response2.message);
          }
          else
          {
            this.toastrService.error("Kiralanamadı", response2.message);
          }
        })
      }
      else
      {
        this.toastrService.error("Kiralanamadı", response1.message);
      }
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAutherized = false;
  userName = "Serhan Altug";

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
      this.isAutherized = true;
  }

  logout(){
    this.isAutherized = false;
    localStorage.clear();
    this.router.navigate(['/login']);  
  }

}

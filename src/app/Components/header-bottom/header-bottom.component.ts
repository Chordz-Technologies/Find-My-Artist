import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css']
})
export class HeaderBottomComponent implements OnInit {
  isNavbarCollapsed = true;
  isUserLoggedIn: boolean = false;
  userType: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {

      this.isUserLoggedIn = loggedIn;
      // alert(this.isUserLoggedIn);
      if (loggedIn) {
        this.userType = this.authService.getUserType();
      } else {
        this.userType = ''; // Reset userType when user logs out
      }
    });
  }

}

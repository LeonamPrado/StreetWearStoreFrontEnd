import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartLength: number = 0;
  isLooged: boolean = false;
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.cartService.cartLength.subscribe(
      (length) => (this.cartLength = length)
    );
    this.userService.isLoggedIn.subscribe(
      (response) => (this.isLooged = response)
    );
  }

  handleLogout() {
    this.userService.isLoggedIn.next(false);
    this.userService.currentUser.next(0);
  }
}

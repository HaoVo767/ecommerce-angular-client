import { CategoryService } from './../../services/categoryService';
import { Component, OnInit } from '@angular/core';
import { UbInputDirective } from '../../../components/ui/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { ActivaRouteSignal } from '@/providers/activeRoute';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  UbDropdownMenuCheckboxItemDirective,
  UbDropdownMenuContentDirective,
  UbDropdownMenuLabelDirective,
  UbDropdownMenuSeparator,
  UbDropdownMenuTriggerDirective,
} from '@/components/ui/dropdown-menu';
import { ICategory } from '@/app/models/type';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UbButtonDirective } from '@/components/ui/button';
import { OrderProductProvider } from '@/providers/orderProduct';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    FormsModule,
    UbInputDirective,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    RouterModule,

    UbDropdownMenuTriggerDirective,
    UbDropdownMenuContentDirective,
    UbDropdownMenuLabelDirective,
    UbDropdownMenuSeparator,
    UbButtonDirective,
    UbDropdownMenuCheckboxItemDirective,
    MatBadgeModule,
  ],
})
export class Header implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private activeRouteSignal: ActivaRouteSignal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public orderProductProvider: OrderProductProvider
  ) {}
  categoryId = '';
  faCartShopping = faCartShopping;
  faBars = faBars;
  searchKey = '';
  formSearchProduct = new FormGroup({
    productName: new FormControl(this.searchKey),
  });
  getCategorySubscription = new Subscription();
  categories: ICategory[] = [
    {
      name: '',
      id: '',
    },
  ];
  statusBar = true;
  activityBar = false;
  panel = false;
  ngOnInit(): void {
    this.getCategorySubscription = this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.categories = data));
    this.categoryId = this.activeRouteSignal.getActiveRoute;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchKey = params['keyword'];
    });
  }
  onSubmit() {
    if (this.formSearchProduct.value.productName?.trim() === '') return;
    this.router.navigate(['/product'], {
      queryParams: { keyword: this.formSearchProduct.value.productName },
    });
  }
}

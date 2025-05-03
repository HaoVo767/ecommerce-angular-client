import { ThreeItems } from '@/app/components/threeItems/threeItems.component';
import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ThreeItems],
})
export class HomePage {}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Toast } from './components/toast/toast.component';
import { ToastProvider } from '@/providers/toastProvider';

@Component({
  selector: 'app-root',
  imports: [Header, FontAwesomeModule, RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(public toastProvider: ToastProvider) {}
  title = 'ecommerce-client';
  isShow: boolean = false;

  ngOnInit(): void {}
}

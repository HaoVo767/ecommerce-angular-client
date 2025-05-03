import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActivaRouteSignal {
  activeRoute = signal('');
  setActiveRoute(active: string) {
    return this.activeRoute.set(active);
  }
  get getActiveRoute() {
    return this.activeRoute();
  }
}

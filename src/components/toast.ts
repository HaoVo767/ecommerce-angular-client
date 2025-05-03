import { Component } from '@angular/core';

import { ToasterComponent } from '@/components/ui/sonner';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ToasterComponent],
  template: ` <ub-toaster /> `,
})
export class AppComponent {}

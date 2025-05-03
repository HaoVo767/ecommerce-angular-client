import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbButtonDirective } from '@/components/ui/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  imports: [CommonModule, UbButtonDirective],
})
export class Filter implements OnInit {
  constructor(
    // private filterService: FilterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  @Input()
  filterData: {
    name: string;
    key: string;
    data: {
      id: string;
      name: string;
    }[];
  } = {
    name: '',
    key: '',
    data: [
      {
        id: '',
        name: '',
      },
    ],
  };
  activeId = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      if (data[this?.filterData?.key] !== '') {
        this.activeId = data[this?.filterData?.key];
      }
    });
  }
  handleChangeFilter(id: string) {
    const queryParams = this.route.snapshot.queryParams;
    if (id === queryParams[this?.filterData?.key]) {
      this.activeId = '';
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { [this.filterData.key]: null },
        queryParamsHandling: 'merge',
      });
    } else {
      this.activeId = id;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { [this.filterData.key]: id },
        queryParamsHandling: 'merge',
      });
    }
  }
}

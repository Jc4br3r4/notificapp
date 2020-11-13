import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";

@Component({
	templateUrl: './dashboard1.component.html',
	styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {

	subtitle: string;
	constructor(public router: Router) {
		this.subtitle = 'This is some text within a card block.';
	}

	ngAfterViewInit() { }

	// openSaldos(id) {
  //   this.router.navigate(['/detalle-de-tu-cuenta'] );
  //
  // }
}

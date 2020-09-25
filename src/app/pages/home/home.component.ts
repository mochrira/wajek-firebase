import { Component, OnInit } from '@angular/core';
import { WuiService } from '@wajek/wui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private wuiService: WuiService
  ) { }

  async openDialog() {
    let res = await this.wuiService.dialog({
      title: 'Konfirmasi',
      message: 'Halo',
      buttons: ["Halo", "sip dech"]
    });
    console.log(res);
  }

  ngOnInit(): void {
  }

}

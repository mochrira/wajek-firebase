import { sanitizeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WuiFirebasePenggunaService } from '@wajek/firebase';
import { WuiService } from '@wajek/wui';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss']
})
export class PenggunaComponent implements OnInit {

  dataPengguna = [];
  page = 1;
  lastPage = false;
  isLoading = false;

  q = '';
  searchMode = false;
  search: Subject<any> = new Subject();
  private unsub: Subject<any> = new Subject();

  constructor(
    private penggunaService: WuiFirebasePenggunaService,
    private wuiService: WuiService
  ) { }

  toggleSearch() {
    this.searchMode = !this.searchMode;
    if(!this.searchMode) {
      this.refresh();
    }
  }

  refresh() {
    this.lastPage = false;
    this.isLoading = false;
    this.dataPengguna = [];
    this.page = 1;
    this.q = '';
    this.next();
  }

  async next() {
    if(!this.isLoading && !this.lastPage) {
      try {
        this.isLoading = true;
        let limit = 30;
        let offset = (this.page - 1) * limit;
        let res: any = await this.penggunaService.result(offset, limit, this.q);
        if(res.length > 0) {
          this.dataPengguna = this.dataPengguna.concat(res);
          this.page ++ ;
        } else {
          this.lastPage = true;
        }
        this.isLoading = false;
      } catch(e) {
        this.isLoading = false;
        this.wuiService.dialog({
          title: 'Error',
          message: e.error?.msg ?? 'Terjadi kesalahan, hubungi administrator',
          buttons: ["OK"]
        });
      } 
    }
  }

  ngOnInit(): void {
    this.next();
    this.search.pipe(takeUntil(this.unsub), debounceTime(500)).subscribe(e => {
      this.q = e.target.value;
      this.lastPage = false;
      this.isLoading = false;
      this.dataPengguna = [];
      this.page = 1;
      this.next();
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}

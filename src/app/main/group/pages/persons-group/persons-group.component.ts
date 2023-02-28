import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-persons-group',
  templateUrl: './persons-group.component.html',
  styleUrls: ['./persons-group.component.css']
})
export class PersonsGroupComponent {
  title: string = "Personas"
  // dtOptions: DataTables.Settings = {}
  // dtTrigger = new Subject<any>();
  // persons: any[] = []
  // errors: string = ""
  // loading = true;

  // constructor(
  //   private grouppService: GroupService
  // ) {
  //   this.uploadPersonsOfGroup()
  // }

  // ngOnInit(): void {
  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 6,
  //     language: {
  //       url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
  //     }
  //   };
  // }

  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }

  // uploadPersonsOfGroup() {
  //   this.grouppService.uploadPersonsOfGroup("").subscribe({
  //     next: (resp => {
  //       this.persons = resp.data
  //       this.dtTrigger.next(this.persons)
  //       this.loading = false
  //     }),
  //     error: (e => {
  //       this.errors = e.error.data
  //     })
  //   })
  // }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllTaskInterface } from '../../groups/interfaces/all-task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL:string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  //TODO: MOSTRAR SOLO LAS TAREAS QUE HAY POR HACER
  // findAllTaskOfGroup(id:string):Observable<AllTaskInterface>{
  //   return this.http.get<AllTaskInterface>(`${this.URL}/task/${id}`)
  // }
}

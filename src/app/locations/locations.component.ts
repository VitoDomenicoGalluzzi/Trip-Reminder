import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Location } from '../model/location';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit {

  http = inject(HttpClient);

  url: string = "http://localhost:3000/locations"

  locations = signal<Location[]>([]);

  completedLocations = computed(() => this.locations().filter(product => product.completed).length);

  toCompleteLocations = computed(() => this.locations().filter(product => !product.completed).length);

  // Aggiungi Location

  onAddLocation(event: any) {
    // console.log(event.target.value)
    let nameLocation: string = event.target.value; 

    let newLocation: Location = {
      name: nameLocation,
      completed: false
    }

    this.http.post<Location>(this.url, newLocation).subscribe( res => {
      // console.log(res)
      this.locations.update( prev => [...prev, res] )

      event.target.value = '';

    })
  
  }

  // Contrassegna Location

  onCompleted( item : Location ) {
    let updatedLocation = {...item, completed: !item.completed};

    this.http.patch<Location>(`${this.url}/${item.id}`, updatedLocation).subscribe( res => {
      // console.log(res)

      this.locations.update(prev => {
        return prev.map(p => p.id === item.id ? res : p)
      })

    })
  }

  // Elimina Location 

  onDelete( item : Location ) {
    this.http.delete<Location>(`${this.url}/${item.id}`).subscribe( res => {
      // console.log(res)

      this.locations.update( prev => prev.filter(location => location.id !== res.id))

    })
  }

  ngOnInit(): void {
    this.http.get<Location[]>(this.url).subscribe( res => {
      // console.log(res)
      this.locations.set(res)
    })
  }

}

import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from '../../locations/locations.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    LocationsComponent
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  tab: number = 1;
}

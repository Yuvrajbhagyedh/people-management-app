import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  standalone: false
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) {
    // Reload data when navigating back to this component
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/' || event.urlAfterRedirects === '/') {
        this.loadPeople();
      }
    });
  }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.loading = true;
    this.errorMessage = '';
    this.peopleService.getPeople().subscribe(
      (data: Person[]) => {
        this.people = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load people. Please check your API connection.';
        this.loading = false;
        console.error('Error loading people:', error);
      }
    );
  }

  editPerson(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deletePerson(id: number) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.peopleService.deletePerson(id).subscribe(
        () => {
          this.loadPeople(); // Reload the list after deletion
        },
        (error) => {
          this.errorMessage = 'Failed to delete person.';
          console.error('Error deleting person:', error);
        }
      );
    }
  }

  addNewPerson() {
    this.router.navigate(['/edit', 'new']);
  }
}


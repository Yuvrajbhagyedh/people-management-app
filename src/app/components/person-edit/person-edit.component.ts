import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
  standalone: false
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId: number | null = null;
  isEditMode = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      age: [''],
      address: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.personId = +id;
      this.loadPerson(this.personId);
    }
  }

  loadPerson(id: number) {
    this.loading = true;
    this.peopleService.getPerson(id).subscribe(
      (person: Person) => {
        this.personForm.patchValue({
          name: person.name,
          email: person.email,
          phone: person.phone || '',
          age: person.age || '',
          address: person.address || ''
        });
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load person details.';
        this.loading = false;
        console.error('Error loading person:', error);
      }
    );
  }

  onSubmit() {
    if (this.personForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const personData: Person = this.personForm.value;
      if (personData.age) {
        personData.age = +personData.age;
      }

      if (this.isEditMode && this.personId) {
        // Update existing person
        this.peopleService.updatePerson(this.personId, personData).subscribe(
          () => {
            this.successMessage = 'Person updated successfully!';
            this.loading = false;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
          },
          (error) => {
            this.errorMessage = 'Failed to update person.';
            this.loading = false;
            console.error('Error updating person:', error);
          }
        );
      } else {
        // Create new person
        this.peopleService.createPerson(personData).subscribe(
          () => {
            this.successMessage = 'Person created successfully!';
            this.loading = false;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
          },
          (error) => {
            this.errorMessage = 'Failed to create person.';
            this.loading = false;
            console.error('Error creating person:', error);
          }
        );
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.personForm.controls).forEach(key => {
        this.personForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get name() { return this.personForm.get('name'); }
  get email() { return this.personForm.get('email'); }
  get phone() { return this.personForm.get('phone'); }
  get age() { return this.personForm.get('age'); }
  get address() { return this.personForm.get('address'); }
}


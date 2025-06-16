import { Component } from '@angular/core';

@Component({
  selector: 'app-add-designation',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <h2 class="text-center mt-5 mb-5 display-5">Add Designation</h2>
      <div class="row">
        <div class="col-md-12">          
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                />
                <label for="floatingInput">Designation title...</label>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label for="floatingSelect">Department name...</label>
              </div>

              <button type="submit" class="btn btn-primary w-100">
                Add Designation
              </button>
            </div>
          </div>
        </div>
  `,
  styleUrl: './add-designation.component.css',
})
export class AddDesignationComponent {}

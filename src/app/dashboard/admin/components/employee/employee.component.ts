import { Component, OnInit } from '@angular/core';
import { ViewEmployee } from '../../../../shared/models/viewEmployee';
import { AdminService } from '../../service/admin.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
   <div class="my-3">
    <a class="btn btn-outline-primary" routerLink="/admin/add-edit-member">Create Member</a>
</div>

<table class="table table-striped">
    <thead>
        <tr class="table-warning">
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Date created</th>
            <th>Roles</th>
            <th class="text-center">Lock / Unlock</th>
            <th class="text-center">Edit / Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngIf="members.length === 0">
            <td colspan="7" class="text-center">No Members</td>
        </tr>

        <tr *ngFor="let member of members">
            <td>{{member.userName}}</td>
            <td>{{member.firstName | titlecase}}</td>
            <td>{{member.lastName | titlecase}}</td>
            <td>{{member.dateCreated | date}}</td>
            <td>
                <span *ngFor="let role of member.roles; let i = index">
                    {{role}}<span *ngIf="i + 1 < member.roles.length">, </span>
                </span>
            </td>
            <td class="text-center">
                <a class="btn btn-warning btn-sm me-2" *ngIf="!member.isLocked" (click)="lockMember(member.id)">
                    Lock
                </a>
                <a class="btn btn-success btn-sm" *ngIf="member.isLocked" (click)="unlockMember(member.id)">
                    Unlock
                </a>
            </td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm me-2" routerLink="/admin/add-edit-member/{{member.id}}">
                    Edit
                </button>
                <button class="btn btn-danger btn-sm" (click)="deleteMember()">
                    Delete
                </button>
            </td>
        </tr>
    </tbody>
</table>

<ng-template #template>
    <div class="modal-body text-center">
        <p>Are you sure you want to delete {{memberToDelete?.userName}}?</p>
        <button type="button" class="btn btn-default" (click)="confirm()">Yes</button>
        <button type="button" class="btn btn-primary" (click)="decline()">No</button>
    </div>
</ng-template>
  `,
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  members: ViewEmployee[] = [];
  memberToDelete: ViewEmployee | undefined;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMembers().subscribe({
      next: members => this.members = members
    });
  }

  lockMember(id: string) {
    this.adminService.lockMember(id).subscribe({
      next: _ => {
        this.handleLockUnlockFilterAndMessage(id, true);
      }
    })
  }

  unlockMember(id: string) {
    this.adminService.unlockMember(id).subscribe({
      next: _ => {
        this.handleLockUnlockFilterAndMessage(id, false);
      }
    })
  }

  deleteMember() {
   
  }

  confirm() {
  }

  decline() {
  }

  private handleLockUnlockFilterAndMessage(id: string, locking: boolean) {
  }

  private findMember(id: string): ViewEmployee | undefined {
    let member = this.members.find(x => x.id === id);
    if (member) {
      return member;
    }

    return undefined;
  }
}

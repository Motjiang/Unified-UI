export interface Employee {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  age?: number;
  identityNumber?: string;
  dateOfBirth?: Date; 

  province?: string;
  city?: string;
  streetAddress?: string;
  postalCode?: string;

  createdBy?: string;
  status?: string;
  role?: string;

  dateCreated: Date; 

  designationId: number;
  departmentId: number;

    userName: string;
  isLocked: boolean;
  roles: string[];
}

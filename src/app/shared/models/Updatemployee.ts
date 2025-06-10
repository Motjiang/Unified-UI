export interface UpdateEmployee {
    id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    password?: string;
    roles: string;
}
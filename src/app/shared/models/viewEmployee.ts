export interface ViewEmployee {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    dateCreated: Date;
    isLocked: boolean;
    roles: string[];
}
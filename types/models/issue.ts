export type Issue = {
	id?: number;
    title: string;
    description: string;
    priority: string;
    assigneeName: string;
    assigneeImage: string;
    sprintId?: number;
    createdAt?: Date;
    updatedAt?: Date
};
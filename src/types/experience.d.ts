export enum ITypeJob {
    REMOTE = 'REMOTE',
    PRESENCIAL = 'PRESENCIAL',
}

export interface IExperience {
    id: number;
    role: string;
    image: string;
    companyName: string;
    description_en: string[];
    description_es: string[];
    startDate: Date;
    endDate?: Date;
    typeJob: ITypeJob;
}

import { ITypeDevelopment, technologies } from '../utils/constants/index';

export interface IProjects {
    id: number;
    name: string;
    description_en: string;
    description_es: string;
    url_gitHub?: string;
    url_web?: string;
    url_appStore?: string;
    url_playStore?: string;
    image: string;
    technologies: technologies[];
    typeDevelopment: ITypeDevelopment;
}
import type { Topics } from "@/utils/constants";

export type IPost = {
    id: number;
    title_es: string;
    title_en: string;
    url_post: string;
    image: string;
    createdAt: Date;
    topics: Topics[];
   };

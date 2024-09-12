export function timeOfExperience(): { years: number, months: number }{
    // Crear la fecha de inicio (diciembre de 2021)
    const fechaInicio = new Date(2021, 4, 1); // Los meses en JavaScript empiezan en 0 (enero)

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la diferencia en años
    let differenceInYears = fechaActual.getFullYear() - fechaInicio.getFullYear();

    // Ajustar la diferencia en años si el mes actual es menor que el mes de inicio
    if (fechaActual.getMonth() < fechaInicio.getMonth() ||
        (fechaActual.getMonth() === fechaInicio.getMonth() && fechaActual.getDate() < fechaInicio.getDate())) {
        differenceInYears--;
    }

    // Calcular la diferencia en meses
    let differenceInMouths = fechaActual.getMonth() - fechaInicio.getMonth();
    if (differenceInMouths < 0) {
        differenceInMouths += 12;
    }

    // Ajustar la diferencia en meses si el día actual es menor que el día de inicio
    if (fechaActual.getDate() < fechaInicio.getDate()) {
        differenceInMouths--;
    }

    // Devolver el resultado en formato "X años Y meses"
    return {
        years: differenceInYears,
        months: differenceInMouths
    }
}

export const getEnvVariable = (variableName:"PUBLIC_SUPABASE_URL" | "PUBLIC_SUPABASE_ANON_KEY" | "PUBLIC_EMAILJS_SERVICE_ID" | "PUBLIC_EMAILJS_TEMPLATE_ID" | "PUBLIC_EMAILJS_PUBLIC_KEY" ) => {
    return import.meta.env[variableName] ?? process.env[variableName];
}

export const formatDate = (date: Date, lang: "es" | "en"): string => {
    const monthsEn: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsEs: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const months = lang === "en" ? monthsEn : monthsEs;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

export const formatDateRange = ({date1, date2, lang}:{date1: string | Date, date2?: string | Date, lang: "es" | "en"}): string => {

    const parsedDate1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const parsedDate2 = typeof date2 === 'string' ? new Date(date2) : date2;

    const formattedDate1 = formatDate(parsedDate1, lang);

    if (!parsedDate2) {
        return formattedDate1;
    }

    const formattedDate2 = formatDate(parsedDate2, lang);

    return `${formattedDate1} - ${formattedDate2}`;
}

export const formatDateToDDMMYYYY = (dateString: Date): string => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear()

    return `${day}/${month}/${year}`;
   };

export enum ITypeDevelopment {
    MOBILE = 'MOBILE',
    WEB = 'WEB',
    NATIVE_IOS = 'NATIVE_IOS',
}

export enum ITechnologies {
    HTML = 'html',
    CSS = 'css',
    JAVASCRIPT = 'javascript',
    TYPESCRIPT = 'typescript',
    REACT = 'react',
    REACT_NATIVE = 'react-native',
    NEXT_JS = 'next-js',
    NODE_JS = 'node-js',
    EXPRESS = 'express',
    MONGO_DB = 'mongo-db',
    PRISMA = 'prisma',
    SUPABASE = 'supabase',
    AWS = 'aws',
    FIREBASE = 'firebase',
    ANT_DESIGN = 'ant-design',
    MATERIAL_UI = 'material-ui',
    BOOTSTRAP = 'bootstrap',
    DETOX = 'detox',
    JEST = 'jest',
    TESTING_LIBRARY = 'testing-library',
    TAILWIND_CSS = 'tailwind-css',
    SWIFTUI = 'swiftui',
    UIKIT = 'uikit',
}

export enum TechnologyColors {
    HTML = '#E34F26',
    CSS = '#264de4',
    JAVASCRIPT = '#F7DF1E',
    TYPESCRIPT = '#3178C6',
    REACT = '#61DAFB',
    REACT_NATIVE = '#61DAFB',
    NEXT_JS = '#0070F3',
    NODE_JS = '#339933',
    EXPRESS = '#317132',
    MONGO_DB = '#47A248',
    PRISMA = '#3982CE',
    SUPABASE = '#60A5FA',
    AWS = '#FF9900',
    FIREBASE = '#FFA611',
    ANT_DESIGN = '#F5222D',
    MATERIAL_UI = '#0081CB',
    BOOTSTRAP = '#563D7C',
    DETOX = '#7146B8',
    JEST = '#C21325',
    TESTING_LIBRARY = '#E33359',
    TAILWIND_CSS = '#38B2AC',
    SWIFTUI = '#FF6700',
    UIKIT = '#00A8FF',
}

export enum Topics {
    REACT = 'REACT',
    REACT_NATIVE = 'REACT_NATIVE',
    NEXT_JS = 'NEXT_JS',
    NODE_JS = 'NODE_JS',
    EXPRESS = 'EXPRESS',
    MONGO_DB = 'MONGO_DB',
    AWS = 'AWS',
    FIREBASE = 'FIREBASE',
    PRISMA = 'PRISMA',
    SUPABASE = 'SUPABASE',
    SWIFTUI = 'SWIFTUI',
    UIKIT = 'UIKIT',
   }


export const navLinks = [
    {
        id: "about",
        title: "nav.about",
    },
    {
        id: "work",
        title: "nav.work",
    },
    {
        id: "project",
        title: "nav.project",
    }
]

export const removeQuotes = (str: string): string => {
    return str.replace(/['"]+/g, '');
}


export const technologies = [
    {
        name: "HTML 5",
        icon: "/imgs/html.png",
        color: "#E44D26"
    },
    {
        name: "CSS 3",
        icon: "/imgs/css.png",
        color: "#1572B6"
    },
    {
        name: "JavaScript",
        icon: "/imgs/javascript.png",
        color: "#F7DF1E"
    },
    {
        name: "TypeScript",
        icon: "/imgs/typescript.png",
        color: "#007ACC"
    },
    {
        name: "SwiftUI",
        icon: "/imgs/swiftUI.png",
        color: "#0070fc"
    },
    {
        name: "UI Kit",
        icon: "/imgs/UIKit.webp",
        color: "#2684FF"
    },
    {
        name: "React Native",
        icon: "/imgs/reactNative.png",
        color: "#61DBFB"
    },
    {
        name: "Expo",
        icon: "/imgs/expoGo.png",
        color: "#4630EB"
    },
    {
        name: "Jest",
        icon: "/imgs/jest.png",
        color: "#C21325"
    },
    {
        name: "Detox",
        icon: "/imgs/Detox.png",
        color: "#5AC8FA"
    },
    {
        name: "React JS",
        icon: "/imgs/reactjs.png",
        color: "#61DAFB"
    },
    {
        name: "Next JS",
        icon: "/imgs/nextjs.png",
        color: "#FAFAFA"
    },
    {
        name: "Astro",
        icon: "/imgs/astro.png",
        color: "#ff5c02"
    },
    {
        name: "Redux Toolkit",
        icon: "/imgs/redux.png",
        color: "#764ABC"
    },
    {
        name: "Node JS",
        icon: "/imgs/nodejs.png",
        color: "#68A063"
    },
    {
        name: "MongoDB",
        icon: "/imgs/mongodb.png",
        color: "#4DB33D"
    },
    {
        name: "Supabase",
        icon: "/imgs/supabase.png",
        color: "#3ecf8e"
    },
    {
        name: "Tailwind CSS",
        icon: "/imgs/tailwind.png",
        color: "#38B2AC"
    },
    {
        name: "Ant Design",
        icon: "/imgs/ant-design.png",
        color: "#0170FE"
    },
    {
        name: "Material UI",
        icon: "/imgs/material-ui.png",
        color: "#0081CB"
    },
    {
        name: "git",
        icon: "/imgs/git.png",
        color: "#F05032"
    },
    {
        name: "GitHub",
        icon: "/imgs/gitHub.png",
        color: "#FAFAFA"
    },
];

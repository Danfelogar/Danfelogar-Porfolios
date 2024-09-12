import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useTranslations } from "@/i18n/utils";
import { styles } from "@/styles/styles";
import type { IProjects } from "@/types/projects";
import { ITechnologies, ITypeDevelopment, TechnologyColors, getEnvVariable } from "@/utils/constants";
import { useEffect, useState } from "react";
import { fadeIn, staggerContainer, textVariant } from "@/utils/motion";
import { CodeSlashOutline } from '../../public/icons/codeSlashOutline';
import { LaptopOutline } from '../../public/icons/laptopOutline';
import { PhonePortraitOutline } from '../../public/icons/phonePortraitOutline';
import { LogoApple } from '../../public/icons/logoApple';


const ProjectCard = ({
    project,
    lang = "en",
    index
  }:{project: IProjects; lang?: "en" | "es";index: number}) => {

    return (
      <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.55)}
      >
        <Tilt className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
        >
          <div className='relative w-full h-[230px]'>
            <img
              src={project.image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl bg-white-100'
            />

            <div className='absolute inset-0 flex  m-3 card-img_hover gap-1 flex-col items-end'>
              {
                project.url_gitHub &&
              <div
                onClick={() => window.open(project.url_gitHub, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={"/icons/githubLogo.svg"}
                  alt='source code'
                  className='w-7 h-7 object-contain'
                />
              </div>
              }
              {
                project.url_appStore &&
              <div
                onClick={() => window.open(project.url_appStore, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={"/icons/appStore.svg"}
                  alt='source code'
                  className='w-7 h-7 object-contain'
                />
              </div>
              }
              {
                project.url_playStore &&
              <div
                onClick={() => window.open(project.url_playStore, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={"/icons/logo-google-playstore.svg"}
                  alt='source code'
                  className='w-6 h-6 object-contain'
                />
              </div>
              }
              {
                project.url_web &&
              <div
                onClick={() => window.open(project.url_web, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={"/icons/search-circle-outline.svg"}
                  alt='source code'
                  className='w-8 h-8 object-contain'
                />
              </div>
              }
            </div>
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{project.name}</h3>
            <p className='mt-2 text-secondary text-[14px] line-clamp-4'>{lang === "en" ? project.description_en : project.description_es}</p>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {project.technologies.map((tech: keyof typeof ITechnologies, idx:number) => (
              <p
                key={`${tech}-${idx}`}
                style={{color: TechnologyColors[tech]}}
                className={`text-[14px]`}
              >
                #{ITechnologies[tech]}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>
    );
  };

export const Works = ({lang}:{lang: "en" | "es" | undefined}) => {
    const [ projects, setProjects ] = useState<IProjects[]>([]);
    const [filterType, setFilterType] = useState<ITypeDevelopment | "ALL">("ALL")
    const [projectsFilters, setProjectsFilters] = useState<IProjects[]>([])
    const [projectsCount, setProjectsCount] = useState({
      web: 0,
      mobile: 0,
      ios: 0,
      all: 0,
    })
    const [ref, inView] = useInView({
      triggerOnce: true,
  });
    const t = useTranslations(lang);

    const getWorkProjects = async () => {
        const response = await fetch(`${getEnvVariable("PUBLIC_SUPABASE_URL")}/Projects`,{
          method: 'GET',
          headers: {
            'apikey': getEnvVariable("PUBLIC_SUPABASE_ANON_KEY"),
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json() as IProjects[]
            setProjectsCount({
              web: result.filter((project) => project.typeDevelopment === ITypeDevelopment.WEB).length,
              mobile: result.filter((project) => project.typeDevelopment === ITypeDevelopment.MOBILE).length,
              ios: result.filter((project) => project.typeDevelopment === ITypeDevelopment.NATIVE_IOS).length,
              all: result.length,
            })
            setProjects(result)
            setProjectsFilters(result)
        }

    const filterProjects = () => {
      if(filterType === "ALL") {
        setProjectsFilters(projects)
        return;
      }else {
        const filteredProjects = projects.filter((project) => project.typeDevelopment === filterType)
        setProjectsFilters(filteredProjects)
      }
    }

    useEffect(() => {
      if(filterType && projects.length > 0){
        filterProjects()
      }
    }, [filterType])

    useEffect(() => {
        getWorkProjects()
    }, [])
  return (
    <motion.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'
    ref={ref}
    animate={inView ? "show" : "hidden"}
    viewport={{ once: true, amount: 0.25 }}
    className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
  >
    <span className='hash-span' id={"project"}>
      &nbsp;
    </span>

    <>
      <motion.div
      variants={textVariant(0.2)}
      >
        <p className={`${styles.sectionSubText} `}>{t("projects.title")}</p>
        <h2 className={`${styles.sectionHeadText}`}>{t("projects.subTitle")}</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 mb-8 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          {t("projects.description")}
        </motion.p>
      </div>

      <div className='w-full flex justify-center flex-wrap gap-7'>
        <div onClick={()=>{
        setFilterType("ALL")
        }} className={`group w-62 p-6 flex gap-3 rounded-xl items-center ${filterType === "ALL" && 'bg-primary'} hover:bg-primary cursor-pointer`}>
          <CodeSlashOutline className={`w-6 h-6 text-alternative-primary ${filterType === "ALL" && "text-white-100"} group-hover:text-white-100`} />
          <p className={`text-alternative-primary ${filterType === "ALL" && "text-white-100"} group-hover:text-white-100`}>{t("projects.all")}{" "}<span className={`opacity-0 group-hover:opacity-100 ${filterType === "ALL" && "opacity-100"} transition-opacity duration-200 transform group-hover:translate-y-[-5px] ml-2`}>{projectsCount.all}</span></p>
        </div>
        <div onClick={()=>{
        setFilterType(ITypeDevelopment.WEB)
        }} className={`group w-62 p-6 flex gap-3 rounded-xl items-center ${filterType === ITypeDevelopment.WEB && 'bg-primary'} hover:bg-primary cursor-pointer`}>
          <LaptopOutline className={`w-6 h-6 text-alternative-primary ${filterType === ITypeDevelopment.WEB && "text-white-100"} group-hover:text-white-100`} />
          <p className={`text-alternative-primary ${filterType === ITypeDevelopment.WEB && "text-white-100"} group-hover:text-white-100`}>{t("projects.web")}{" "}<span className={`opacity-0 group-hover:opacity-100 ${filterType === ITypeDevelopment.WEB && "opacity-100"} transition-opacity duration-200 transform group-hover:translate-y-[-5px] ml-2`}>{projectsCount.web}</span></p>
        </div>
        <div onClick={()=>{
        setFilterType(ITypeDevelopment.MOBILE)
        }} className={`group w-62 p-6 flex gap-3 rounded-xl items-center ${filterType === ITypeDevelopment.MOBILE && 'bg-primary'} hover:bg-primary cursor-pointer`}>
          <PhonePortraitOutline className={`w-6 h-6 text-alternative-primary ${filterType === ITypeDevelopment.MOBILE && "text-white-100"} group-hover:text-white-100`} />
          <p className={`text-alternative-primary ${filterType === ITypeDevelopment.MOBILE && "text-white-100"} group-hover:text-white-100`}>{t("projects.mobile")}{" "}<span className={`opacity-0 group-hover:opacity-100 ${filterType === ITypeDevelopment.MOBILE && "opacity-100"} transition-opacity duration-200 transform group-hover:translate-y-[-5px] ml-2`}>{projectsCount.mobile}</span></p>
        </div>
        <div onClick={()=>{
        setFilterType(ITypeDevelopment.NATIVE_IOS)
        }} className={`group w-62 p-6 flex gap-3 rounded-xl items-center ${filterType === ITypeDevelopment.NATIVE_IOS && 'bg-primary'} hover:bg-primary cursor-pointer`}>
          <LogoApple className={`w-6 h-6 text-alternative-primary ${filterType === ITypeDevelopment.NATIVE_IOS && "text-white-100"} group-hover:text-white-100`} />
          <p className={`text-alternative-primary ${filterType === ITypeDevelopment.NATIVE_IOS && "text-white-100"} group-hover:text-white-100`}>{t("projects.ios")}{" "}<span className={`opacity-0 group-hover:opacity-100 ${filterType === ITypeDevelopment.NATIVE_IOS && "opacity-100"} transition-opacity duration-200 transform group-hover:translate-y-[-5px] ml-2`}>{projectsCount.ios}</span></p>
        </div>
      </div>

      <div className='mt-20 flex justify-center flex-wrap gap-7'>
        {projectsFilters.map((project, index) => (
          <ProjectCard key={`project-${project.id}`} index={index} lang={lang} project={project} />
        ))}
      </div>
    </>
  </motion.section>
  )
}

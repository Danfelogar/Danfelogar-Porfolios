import { motion } from "framer-motion";
import { VerticalTimeline} from "react-vertical-timeline-component";
import { staggerContainer, textVariant } from "@/utils/motion";
import { styles } from "@/styles/styles";
import { useEffect, useState } from "react";
import { formatDateRange, getEnvVariable } from "@/utils/constants";
import type { IExperience } from "@/types/experience";

import pkg from 'react-vertical-timeline-component';
const { VerticalTimelineElement } = pkg;

import "react-vertical-timeline-component/style.min.css";
import { useTranslations } from "@/i18n/utils";

const ExperienceCard = ({ experience, lang = "en" }:{experience: IExperience; lang?: "es" | "en"}) => {
    return (
        <VerticalTimelineElement
          contentStyle={{
            background: "#1d1836",
            color: "var(--white-100)",
          }}
          contentArrowStyle={{ borderRight: "7px solid  var(--secondary)" }}
          date={formatDateRange({
            date1: experience.startDate,
            date2: experience.endDate,
            lang: lang,
          })}
          iconStyle={{ background: experience.image }}
          icon={
            <div className='flex justify-center items-center w-full h-full'>
              <img
                src={experience.image}
                alt={experience.companyName}
                className='w-[100%] h-[100%] object-contain rounded-full'
              />
            </div>
          }
        >
          <div>
            <h3 className='text-white text-[24px] font-bold'>{experience.role}</h3>
            <p
              className='text-secondary text-[16px] font-semibold'
              style={{ margin: 0 }}
            >
              {experience.companyName}
            </p>
          </div>

          <ul className='mt-5 list-disc ml-5 space-y-2'>
            {(lang === "en" ? experience.description_en : experience.description_es).map((item: string, index: number) => (
              <li
                key={`experience-item-${index}`}
                className='text-white-100 text-[14px] pl-1 tracking-wider'
              >
                {item}
              </li>
            ))}
          </ul>
        </VerticalTimelineElement>
      );
};

export const Timeline = ({lang}:{lang: "en" | "es" | undefined})  => {
  const t = useTranslations(lang);
  const [ experiences, setExperiences ] = useState<IExperience[]>([])

  const getWorkExperience = async () => {
    const response = await fetch(`${getEnvVariable("PUBLIC_SUPABASE_URL")}/Experience?order=id.asc`,{
      method: 'GET',
      headers: {
        'apikey': getEnvVariable("PUBLIC_SUPABASE_ANON_KEY"),
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json() as IExperience[]
    setExperiences(result)
  }

  useEffect(() => {
    getWorkExperience()
  }, [])

  return (
    <motion.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'

    viewport={{ once: true, amount: 0.25 }}
    className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
  >
    <span className='hash-span' id={"work"}>
      &nbsp;
    </span>
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {t("timeline.title")}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {t("timeline.subTitle")}
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col overflow-hidden'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
                lang={lang && lang}
                key={`experience-${index}`}
                experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  </motion.section>
  )
}
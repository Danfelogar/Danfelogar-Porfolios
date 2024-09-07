
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "@/utils/motion";
import { styles } from "@/styles/styles";
import { useTranslations } from '@/i18n/utils';
import { timeOfExperience } from '@/utils/constants';

const ServiceCard = ({ index, title, icon,pdfFile }:{
    index: number;
    title: string;
    icon: string;
    pdfFile?: string;
}) => (
  <Tilt  className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 onClick={()=>{
          if(pdfFile) window.open(pdfFile, '_blank')
        }} className={` text-[20px] font-bold text-center ${pdfFile ? 'cursor-pointer text-alternative-primary' : 'text-white'}`}>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

export const AboutMe = ({lang}:{lang: "en" | "es" | undefined}) => {
  const t = useTranslations(lang);
  const { months, years } = timeOfExperience()
  return (
    <motion.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'

    viewport={{ once: true, amount: 0.25 }}
    className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
  >
    <span className='hash-span' id={"about"}>
      &nbsp;
    </span>

    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("about.subTitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("about.title")}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {t("about.text1")} <span className='text-alternative-primary'>{t("about.text2")}</span>{t("about.text3")}<span className='text-alternative-primary'>{`${years}`} {t("about.textYear")}  { months !== 0 && <>{t("about.and")} {`${months}`} {t("about.textMonth")}</>} {t("about.text4")}
          </span> {t("about.text5")}
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {/* {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))} */}
        <ServiceCard  index={0} icon="/icons/webIcon.svg" title={t("about.webDeveloper")} />
        <ServiceCard  index={1} icon="/icons/reactNativeIcon.svg" title={t("about.reactNativeDeveloper")} />
        <ServiceCard  index={2} icon="/icons/backendIcon.svg" title={t("about.backendDeveloper")} />
        <ServiceCard  index={3} icon="/icons/swiftIcon.svg" title={t("about.iOSDeveloper")} />
        <ServiceCard pdfFile={
          lang === "en" ? "/pdfs/Cv-danielpolo-frontend-english.pdf" : "/pdfs/Cv-danielpolo-frontend-español.pdf"
        } index={4} icon="/icons/pdf.svg" title={t("about.pdf")} />
      </div>
    </>
  </motion.section>
  );
};

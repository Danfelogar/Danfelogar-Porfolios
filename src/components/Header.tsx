import { motion } from "framer-motion";
import { styles } from "@/styles/styles"
import { SetUp } from "./3DModels/SetUp";
import { useTranslations } from "@/i18n/utils";


export const Header = ({lang}:{lang: "en" | "es" | undefined}) => {
  const t = useTranslations(lang);
  return (
    <section className={`relative w-full h-screen mx-auto`}>
    <div
      className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
    >
      <div className='flex flex-col justify-center items-center mt-5'>
        <div className='w-5 h-5 rounded-full bg-alternative-primary' />
        <div className='w-1 sm:h-80 h-40 violet-gradient' />
      </div>

      <div>
        <h1 className={`${styles.heroHeadText} text-white-200`}>
          {t("header.title")}{" "}
          <span className='text-alternative-primary'>{t("header.name")}</span>

          {/* <div className="overflow-hidden bg-orange-400 h-20">
            <span className="dynamic-txts text-alternative-primary">Daniel</span>
            <span className="dynamic-txts text-alternative-primary">Frontend Engineer</span>
            <span className="dynamic-txts text-alternative-primary">Web Developer</span>
            <span className="dynamic-txts text-alternative-primary">Mobile Developer</span>
          </div> */}

          {/* <span className='text-alternative-primary text-wrapper '>
            <span className="line"></span>
            <span className="letters">Daniel</span>
            <span className="letters">Frontend Engineer</span>
            <span className="letters"></span>
            <span className="letters">Mobile Developer</span>
          </span> */}
        </h1>
        <p className={`${styles.heroSubText} mt-2 text-white-200`}>
          {t("header.subtitle1")} <br className='sm:block hidden' />
          {t("header.subtitle2")}
        </p>
      </div>
    </div>

    <SetUp />

    <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
      <a href='#about'>
        <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className='w-3 h-3 rounded-full bg-secondary mb-1'
          />
        </div>
      </a>
    </div>
  </section>
  )
}

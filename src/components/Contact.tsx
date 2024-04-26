import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { slideIn } from '../utils/motion';
import { styles } from '../styles/styles';
import { getEnvVariable } from "@/utils/constants";
import { useTranslations } from "@/i18n/utils";
import { PokeCenter } from "./3DModels/PokeCenter";


export const Contact = ({lang}:{lang: "en" | "es" | undefined}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const t = useTranslations(lang);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        getEnvVariable("PUBLIC_EMAILJS_SERVICE_ID"),
        getEnvVariable("PUBLIC_EMAILJS_TEMPLATE_ID"),
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        getEnvVariable("PUBLIC_EMAILJS_PUBLIC_KEY")
      )
      .then(
        () => {
          setLoading(false);
          alert(t("contact.success"));

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error: any) => {
          setLoading(false);
          console.error(error);

          alert(t("contact.error"));
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden max-w-7xl m-auto`}
    >
      <motion.div
      initial='hidden'
      whileInView='show'
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>{t("contact.title")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.subTitle")}</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.name")}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.namePlaceholder")}
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.email")}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.emailPlaceholder")}
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.message")}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.messagePlaceholder")}
              className='bg-tertiary resize-none py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? t("contact.sending") : t("contact.send") }
          </button>
        </form>
      </motion.div>

      <motion.div
      initial='hidden'
      whileInView='show'
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto w-full xl:w-[50%] md:h-[550px] h-[350px]'
      >
        <PokeCenter />
      </motion.div>
    </div>
  );
}

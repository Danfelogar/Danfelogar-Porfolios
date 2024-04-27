import { styles } from '@/styles/styles';
import { fadeIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useTranslations } from '../i18n/utils';
import { useEffect, useState } from 'react';
import { Topics, formatDateToDDMMYYYY, getEnvVariable } from '@/utils/constants';
import type { IPost } from '@/types/popularPosts';

const PostCard = ({post, lang = "en",
index}: {post: IPost; lang?: "en" | "es";index: number}) => (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className='cursor-pointer bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
      onClick={() => window.open(post.url_post, '_blank')}
    >
      <p className='text-white font-black text-[48px]'>"</p>
  
      <div className='mt-1 '>
        <p className='min-h-24 text-white tracking-wider text-[18px]'>{lang === "en" ? post.title_en : post.title_es}</p>
  
        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
                <div className='flex w-full'>
                    {
                        post.topics.map((topic: Topics, idx: number) => (
                            <p key={idx}  className='text-white font-medium text-sm'><span className='blue-text-gradient'>#</span> {topic} {idx === post.topics.length - 1 ? '' : ',' }
                            </p>
                        ))
                    }
                </div>
            <p className='mt-1 text-secondary text-[12px]'>
            {formatDateToDDMMYYYY(post.createdAt)}
            </p>
          </div>
  
          <img
            src={post.image}
            alt={`feedback_by-${post.createdAt}`}
            className='w-10 h-10 rounded-full object-fill'
          />
        </div>
      </div>
    </motion.div>
  );

export const PopularPosts = ({lang}:{lang: "en" | "es" | undefined}) => {
    const [post, setPost] = useState<IPost[]>([])
    const t = useTranslations(lang);
    const getPost = async () => {
        const response = await fetch(`${getEnvVariable("PUBLIC_SUPABASE_URL")}/Post`,{
            method: 'GET',
            headers: {
            'apikey': getEnvVariable("PUBLIC_SUPABASE_ANON_KEY"),
            'Content-Type': 'application/json',
            },
        });

        const result = await response.json() as IPost[]
        setPost(result)
    }

    useEffect(() => {
        getPost()
    }, [])

  return (
    <div className={`mt-12 bg-black-100 max-w-7xl m-auto rounded-[20px]`}>
    <div
      className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
    >
      <motion.div initial='hidden'
    whileInView='show' variants={textVariant()} className="mb-10">
        <p className={styles.sectionSubText}>{t("popularPosts.title")}</p>
        <h2 className={styles.sectionHeadText}>{t("popularPosts.subTitle")}</h2>
      </motion.div>
    </div>
    <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
      {post.map((post, idx) => (
        <PostCard key={post.id} post={post} index={idx} lang={lang}/>
      ))}
    </div>
  </div>
  )
}

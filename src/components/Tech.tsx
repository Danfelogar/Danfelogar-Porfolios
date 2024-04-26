import { technologies } from "@/utils/constants"
import { Ball } from "./3DModels/Ball"

export const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10 max-w-7xl m-auto'>
    {technologies.map((technology) => (
      <div className='w-32 h-32' key={technology.name}>
        <Ball icon={technology.icon} />
        <h1 className={`text-white-100 mt-1 font-medium lg:text-lg sm:text-sm xs:text-xs text-[16px] text-center`}>
        {technology.name}
        </h1>
      </div>
    ))}
  </div>
  )
}

import { removeQuotes, technologies } from "@/utils/constants"

export const Tech = () => {
  return (
    <ul className='flex list-none flex-row flex-wrap justify-center gap-10 max-w-7xl mx-8 xl:m-auto'>
    {technologies.map((technology: {
    name: string;
    icon: string;
    color: string;
  }) => (
      <li className={`relative select-none flex flex-row justify-center items-center rounded-2xl w-20 h-20 group hover:border`} key={technology.name}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = technology.color}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
      >
        <div style={{backdropFilter: "blur(30px)"}} className={`rounded-2xl w-20 h-20 absolute -z-10 border border-transparent`}/>
        <img
          src={technology.icon}
          alt={technology.name}
          className={`w-12 h-12 block object-contain`}/>
          <div style={{borderColor: technology.color}} className="absolute hidden  -top-12 border group-hover:flex items-center justify-center w-32 p-2 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-slideUp">
            <h1 style={{color: technology.color}} className={`font-medium text-sm text-center`}>
              {technology.name}
            </h1>
        </div>
        <div className="absolute w-3 h-3 rounded-full -z-20" style={{ boxShadow:`0 0 35px 12px ${technology.color}` }}/>
      </li>
    ))}
  </ul>
  )
}

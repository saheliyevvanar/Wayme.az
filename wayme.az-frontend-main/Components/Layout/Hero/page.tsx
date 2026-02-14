import Container from '../../Container/page'
import { Code, MoveRight } from 'lucide-react'

type HeroProps = {
    onStartTest?: () => void;
};

const Hero = ({ onStartTest }: HeroProps) => {
    return (
        <div className='relative overflow-hidden pt-4 pb-40 sm:pt-12 sm:pb-48'>
            <div className='absolute inset-0 -z-10 w-full h-full overflow-hidden'>
                <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[80px] animate-blob-diagonal" />
                <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-blue-400/12 rounded-full filter blur-[90px] animate-blob-diagonal-reverse" />
            </div>
            <div className='max-w-6xl mx-auto px-6'>
                <div className='flex flex-col items-center text-center'>
                    <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 backdrop-blur-sm'>
                        <Code className='size-3 sm:size-4 text-blue-400' />
                        <span className='text-xs sm:text-sm font-medium text-gray-300'>Peşəkar karyera yönləndirmə sistemi</span>
                    </div>

                    <h1 className='mt-6 sm:mt-8 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[80px]'>
                        <span className='text-[#AD46FF]'>İdeal iş</span> <br />
                        <span className='bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] bg-clip-text text-transparent'>
                            istiqamətinizi tapın
                        </span>
                    </h1>

                    <p className='mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400'>
                        Ən uyğun karyera istiqamətini müəyyən etmək üçün psixoloji keyfiyyətlərinizin və peşəkar bacarıqlarınızın kompleks qiymətləndirmə sistemi
                    </p>

                    <button
                        onClick={onStartTest}
                        className='group mt-8 sm:mt-10 z-10 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(to_right,#2B7FFF,#F6339A,#2B7FFF)] bg-[length:200%_auto] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white transition-all duration-500 hover:bg-right hover:scale-105 hover:shadow-[0_0_30px_rgba(246,51,154,0.5),0_0_60px_rgba(43,127,255,0.3)] hover:brightness-110'
                    >
                        Testə başla
                        <MoveRight className='size-4 sm:size-5 transition-transform' />
                    </button>
                </div>
            </div>

            <div className='absolute -bottom-8 left-0 right-0 w-full'>
                <img src="/wave.png" alt="wave image" className='w-[120%] max-w-none -ml-[10%]' />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2B7FFF]/20 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-24 pointer-events-none overflow-hidden">
  
  {/* Base ambient light */}
  <div className="
    absolute inset-0
    bg-gradient-to-t
    from-[#fff]/25
    via-[#fff]/10
    to-transparent
    blur-3xl
    opacity-70
  " />

  {/* Wide diffused glow */}
  <div className="
    absolute bottom-0 left-1/2 -translate-x-1/2
    w-[90%] h-[120%]
    bg-gradient-to-r
    from-transparent
    via-[#fff]/20
    to-transparent
    blur-[90px]
    opacity-60
  " />

  {/* Very soft breathing light */}
  <div className="
    absolute inset-0
    bg-gradient-to-r
    from-transparent
    via-[#285AC5]/15
    to-transparent
    blur-[120px]
    animate-[softGlow_6s_ease-in-out_infinite]
  " />

</div>

            </div>
        </div>
    )
}

export default Hero


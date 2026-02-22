"use client"
import React, { useEffect, useState } from 'react'
import Container from '../../Container/page'
import { Info, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if we're on a test page
  const isTestPage = pathname?.startsWith('/sexsi-') || pathname?.includes('test')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStopTest = () => {
    // localStorage-dən bütün test məlumatlarını sil
    if (typeof window !== 'undefined') {
      localStorage.removeItem('personalSkills');
      localStorage.removeItem('personalInfo');
    }
    router.push('/');
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#091E3E]/80 backdrop-blur-md shadow-lg border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <Container>
        <div className='flex items-center justify-between w-full pt-3 pb-3 px-4 sm:px-6 lg:px-8'>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13'>
              <img src="/logo.png" alt="wayme.az logo" className='mt-1.5 sm:mt-2.5 w-full h-full object-contain' />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-white text-[16px] sm:text-[18px] lowercase font-arimo font-bold leading-tight`}>wayme.az</h1>
              <p className='text-[#99A1AF] text-[10px] sm:text-[11px] capitalize leading-tight'>Career Guidance</p>
            </div>
          </div>

          <div>
            {isTestPage ? (
              <button
                onClick={handleStopTest}
                className='flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[14px] text-white bg-transparent relative overflow-hidden group cursor-pointer'
              >
                <span className='absolute inset-0 rounded-[14px] p-[1.5px] bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A]'>
                  <span className='flex h-full w-full rounded-[14px] bg-[#091E3E]'></span>
                </span>
                <span className='relative z-10 flex items-center gap-1.5 text-sm sm:text-base'>
                  <X className='w-4 h-4 sm:w-5 sm:h-5' /> Testi dayandır
                </span>
              </button>
            ) : (
              <Link href="/haqq;mda">
                <button className='flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[14px] text-white bg-transparent relative overflow-hidden group cursor-pointer'>
                  <span className='absolute inset-0 rounded-[14px] p-[1.5px] bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A]'>
                    <span className='flex h-full w-full rounded-[14px] bg-[#091E3E]'></span>
                  </span>
                  <span className='relative z-10 flex items-center gap-1.5 text-sm sm:text-base'>
                    <Info className='w-4 h-4 sm:w-5 sm:h-5' /> Haqqımızda
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header

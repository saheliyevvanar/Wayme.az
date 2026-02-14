import React from 'react'

const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='max-w-[1440px] mx-auto w-full px-6 sm:px-10'>{children}</div>
  )
}

export default Container

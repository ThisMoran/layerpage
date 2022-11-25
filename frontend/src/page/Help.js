import React from 'react'
import Header from '../components/Header'
import RightMenu from '../components/RightMenu'

const Help = () => {
  return (
    <main className="flex flex-col justify-between h-screen">
      <Header />

      <div className="flex justify-between border-b border-EA h-full dark:bg-[#1A1919]">
        <div className="w-full">
          <div className="flex flex-col justify-between container max-w-5xl px-5 mx-auto h-full">
            <h1 className="dark:text-[#FFFFFF]">Help</h1>
          </div>
        </div>
        <RightMenu />
      </div>
    </main>
  )
}

export default Help
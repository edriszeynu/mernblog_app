import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>want to learn about javascript?</h2>
            <p className='text-gray-500 my-2'>checkout these resources with 100 javascript projects</p>
            <button className='text-green-500 rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>100 javascript projects</a>
            </button>
        </div>
        <div className='p-7 flex-1'>
            <img src="" alt="image" />
        </div>
    </div>
  )
}

export default CallToAction
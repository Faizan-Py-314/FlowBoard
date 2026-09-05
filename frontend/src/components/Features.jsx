import { useState } from 'react'
import FeatureCard from './FeatureCard'


const Features = ({ isOpen = true }) => {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div
            className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`mx-auto bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-4 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                <div className='flex items-end justify-between'>
                    <h2 className='text-2xl font-bold'>Features</h2>
                    <button className='py-2 px-3 text-xs cursor-pointer rounded-md bg-black text-white md:text-sm'>Add Feature</button>
                </div>
                <hr className='text-gray-300' />
                <FeatureCard/>
            </div>
        </div>
    )
}

export default Features
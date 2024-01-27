import React from 'react'
import Logo from "@/assets/images/ticket-go.png"
import Image from 'next/image'

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Image src={Logo} width={200} height={200} alt='logo' className='transition-all animate-pulse' />
        </div>
    )
}

export default Loading
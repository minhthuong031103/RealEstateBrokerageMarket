import React from 'react'
import AgencyImageAndName from '../(components)/(profile)/AgencyImageAndName'
import AgencyInfo from '../(components)/(profile)/AgencyInfo'

const page = () => {
    return (
        <div className='m-4'>
            <h1 className='text-2xl font-bold'>Hồ sơ đối tác</h1>
            {/* <div className='w-full h-screen mt-4 bg-white rounded-lg border-solid border-2 border-white'> */}
            <AgencyImageAndName />
            <AgencyInfo />
            {/* </div> */}
        </div>
    )
}

export default page
import React from 'react'
import AgencyImageAndName from '../(components)/(profile)/AgencyImageAndName'
import AgencyInfo from '../(components)/(profile)/AgencyInfo'
import { getSession } from '@/lib/auth'


export default async function page() {
    const session = await getSession()
    return (
        <div className='m-4'>
            <h1 className='text-2xl font-bold'>Hồ sơ đối tác</h1>
            <AgencyImageAndName session={session} />
            <AgencyInfo session={session} />
        </div>
    )
}

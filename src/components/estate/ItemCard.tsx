'use client'

import React from "react"
import Image from "next/image"

interface Props {
    category: string
    name: string
}

export default class ItemCard extends React.Component<Props>
{
    render(): React.ReactNode {
        return <div className="flex flex-col max-w-fit shadow-lg rounded-xl p-4" >
                <Image className="rounded-xl mb-2" src="/jwyncled.bmp" height={128} width={160} alt="" />
                <h2 className="text-sm font-medium text-red-400">{this.props.category}</h2>
                <h1 className="text-lg">{this.props.name}</h1>
            </div>
    }
}
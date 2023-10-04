'use client'

import React from "react"
import Image from "next/image"
import { Button } from "@nextui-org/react"

export interface PartnerProps {
    name: string
    img_url: string
    description: string
    address: string
}

export class PartnerCardV extends React.Component<PartnerProps>
{
    render(): React.ReactNode {
        return <div className="flex-col px-4 py-8 basis-3/4 md:basis-1/2 lg:basis-1/3 shrink-0">

            <div className="shadow-xl rounded-xl p-8 flex flex-col gap-y-4" >
                <div className="py-4">
                    <Image className="rounded-xl mb-2 w-32 lg:w-40 " src={this.props.img_url} height={128} width={160} alt="" />
                </div>
                <h1 className="text-lg font-semibold">{this.props.name}</h1>
                <h2 className="text-md font-thin leading-7">{this.props.description}</h2>
                <div className="flex flex-row space-x-1">
                    <Image src="/location-1-svgrepo-com.svg" alt="" width={20} height={20}/>
                    <h2 className="text-md font-thin text-slate-400">{this.props.address}</h2>
                </div>


                {/* <Button color="default" className=" w-40">Nhắn tin</Button> */}
                <Button color="primary" className="w-40">Đến kênh đối tác</Button>
            </div>

        </div> 
    }
}

export class PartnerCardH extends React.Component<PartnerProps>
{
}

export interface ContainerProps
{
    // children: any,
    partners: PartnerProps[],
    // direction: string,
}

export function PartnersContainer(props:ContainerProps) {
    return  <div className="m-2 rounded-xl shadow-inner w-full xl:max-w-screen-xl  mx-auto">
        <h1 className="text-2xl w-fit mx-8 mt-8">Các đối tác: </h1>
        <div className='flex flex-row flex-nowrap overflow-auto w-50'>
        {
            props.partners.map((p) => {
                return <PartnerCardV name={p.name} description={p.description} address={p.address} img_url={p.img_url} />
                
            })
            // ["aaaaaa", "Aaaaaaaaaaa"].map((s) => {
            //   return <PartnerCard name={s} img_url='/istockphoto-925138596-612x612.jpg' description='aaaaaaaaaaaaaaaaaaaaaaaa' address='aaaaaaaa'></PartnerCard>
            // })
        }
        </div>
    </div>
}
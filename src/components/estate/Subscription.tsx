'use client'

import { Button } from "@nextui-org/react";
import React from "react";

export interface SubscriptionProps
{
    name: string,
    subtitle: string,
    currency: string
    price: number
    cycle: string
    description: string,
}

export class SubscriptionCard extends React.Component<SubscriptionProps>
{
    render(): React.ReactNode {
        return <div className="px-8 py-12 basis-1/3 shrink-0">
            <div className="shadow-lg rounded-xl p-8 flex-col flex gap-y-4">
                <h1 className="font-bold">{this.props.name}</h1>
                <h2>{this.props.subtitle}</h2>
                <div className="flex flex-row space-x-2 w-fit mx-auto">
                    <h2>{this.props.currency}</h2>
                    <h2 className="text-4xl font-bold">{this.props.price.toFixed(2)}</h2>
                    <h2 className="text-slate-500">/{this.props.cycle}</h2>
                </div>
                <div className="h-80 mt-4">

                    <p className="">{this.props.description}</p>
                </div>
                <Button color="primary">Mua</Button>
            </div>
        </div>
    }
}

export function SubscriptionContainer(): React.ReactNode {
    return <div className="flex flex-nowrap mx-auto overflow-auto w-full lg:max-w-screen-lg">
        <SubscriptionCard name="Cơ bản" subtitle="Gói miễn phí" currency="VND" price={0.0} cycle="Tháng" description="Các tính năng bao gồm"/>
        <SubscriptionCard name="Cơ bản" subtitle="Gói miễn phí" currency="VND" price={0.0} cycle="Tháng" description="Các tính năng bao gồm"/>
        <SubscriptionCard name="Cơ bản" subtitle="Gói miễn phí" currency="VND" price={0.0} cycle="Tháng" description="Các tính năng bao gồm"/>
    </div>
}
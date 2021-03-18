import useSWR from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'

export default function IndexPage() {
    const { data: btc } = useSWR(
        'https://api.coindesk.com/v1/bpi/currentprice/btc.json'
    )

    const [now, setNow] = useState(Date.now())
    useEffect(() => {
        setInterval(() => setNow(Date.now()), 1000)
    }, [])

    const day = moment(now).format('ddd')
    const date = moment(now).format('MMM D')
    const clock = moment(now).format('h:mm:ss a')

    return (
        <div className="h-screen w-screen space-y-4 p-6 bg-black p-24">
            <div className="space-y-8">
                <div className="flex space-x-8">
                    <div className="bg-red-500 text-black rounded-lg py-4 px-8 rounded-4 flex items-center">
                        <p className="text-6xl font-extrabold">{clock}</p>
                    </div>
                    <div className="bg-indigo-500 text-black font-extrabold rounded-lg p-4 rounded-4 flex items-center">
                        <div className="">
                            <p className="text-4xl">{day}</p>
                            <p className="text-5xl">{date}</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-8">
                    <div className="bg-yellow-500 text-black rounded-lg py-4 px-8 rounded-4 flex items-center">
                        <p className="text-6xl font-extrabold">{clock}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

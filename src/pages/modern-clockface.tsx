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

    // const date = moment(now).format('dddd, MMMM Do YYYY, h:mm:ss a')
    const date = moment(now).format('dddd, MMMM Do YYYY')
    const clock = moment(now).format('h:mm:ss a')

    return (
        <div
            className="h-screen w-screen p-6 bg-black flex items-center justify-center"
            style={{ color: 'lime' }}
        >
            <div className="text-center space-y-4">
                <p className="text-8xl font-extrabold">{clock}</p>
                <p className="text-3xl">{date}</p>
                <p>BTC: ${btc?.bpi?.USD?.rate}</p>
            </div>
        </div>
    )
}

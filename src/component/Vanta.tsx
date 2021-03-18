import React, { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import TOPOLOGY from 'vanta/dist/vanta.topology.min'
import moment from 'moment'

const MyComponent = (props) => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                TOPOLOGY({
                    el: myRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    const { data: btc } = useSWR(
        'https://api.coindesk.com/v1/bpi/currentprice/btc.json'
    )

    const [now, setNow] = useState(Date.now())
    useEffect(() => {
        setInterval(() => setNow(Date.now()), 1000)
    }, [])

    const day = moment(now).format('dddd')
    const date = moment(now).format('MMMM DD')
    const clock = moment(now).format('h:mm:ss a')
    return (
        <div ref={myRef} className="absolute inset-0">
            <div className="h-screen cursor-none w-screen space-y-4 p-6 text-gray-200 p-24 flex items-center justify-center">
                <div className="space-y-4">
                    <p className="text-8xl text-lime">{clock}</p>
                    <div className="flex flex-row items-center">
                        <p className="text-4xl text-lime flex-1">{day}</p>
                        <p className="text-4xl text-lime">{date}</p>
                    </div>
                    <p className="text-6xl text-yellow-500">
                        BTC: ${btc?.bpi?.USD?.rate}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MyComponent

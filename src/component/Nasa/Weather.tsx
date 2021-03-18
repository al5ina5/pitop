import useSWR from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'

export default function Weather() {
    const { data: weather } = useSWR(
        'https://api.openweathermap.org/data/2.5/weather?zip=34112&appid=f09d8e2338665ef920ba409e84ede74f&units=imperial'
    )

    const [now, setNow] = useState(Date.now())
    useEffect(() => {
        const handler = setInterval(() => setNow(Date.now()), 1000)
        return () => {
            clearInterval(handler)
        }
    }, [])

    const day = moment(now).format('dddd')
    const date = moment(now).format('MMMM Do')
    const clock = moment(now).format('h:mm:ss')

    return (
        <div className="h-full w-full bg-gray-900 bg-opacity-50 text-gray-200 p-12 flex items-center justify-center space-x-12">
            <div className="font-pixel space-y-4 text-center">
                <p className="text-9xl font-extrabold">
                    {Math.trunc(weather?.main?.temp)} &deg;C
                </p>
                <div className="w-full flex-1 text-center text-2xl flex flex-row space-x-4">
                    {/* <p className="bg-white flex-1 text-center text-sm px-4 py-2 bg-opacity-25 rounded-lg">
                        {Math.trunc(weather?.main?.feels_like)} &deg;C
                    </p> */}
                    <p className="flex-1 text-center">
                        {weather?.main?.temp_min} &deg;C -{' '}
                        {weather?.main?.temp_max} &deg;C
                    </p>
                </div>
            </div>

            <div></div>
        </div>
    )
}

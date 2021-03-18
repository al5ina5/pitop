import useSWR from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'
import Image from '../component/Nasa/Image'
import Weather from '../component/Nasa/Weather'

const Expand = ({ string, maxLength }) => {
    const [isOpen, setIsOpen] = useState()

    if (!string) return 'loading'
    if (isOpen) return <p onClick={() => setIsOpen((s) => !s)}>{string}</p>
    if (string.length > maxLength) {
        return (
            <p onClick={() => setIsOpen((s) => !s)}>
                {string.substring(0, 200) + '...'}
            </p>
        )
    } else {
        return <p onClick={() => setIsOpen((s) => !s)}>{string}</p>
    }
}

export default function IndexPage() {
    const { data: btc } = useSWR(
        'https://api.coindesk.com/v1/bpi/currentprice/btc.json'
    )

    const { data: nasa } = useSWR(
        'https://api.nasa.gov/planetary/apod?api_key=bwdecxWJZGIXhFgsECGlOt6zskKznR9A0uAaffA8'
    )

    const { data: weather } = useSWR(
        'https://api.openweathermap.org/data/2.5/weather?zip=34112&appid=f09d8e2338665ef920ba409e84ede74f&units=imperial'
    )

    const [page, setPage] = useState(0)

    const nextPage = () => {
        if (page >= 4) return setPage(0)
        return setPage((s) => s + 1)
    }

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
        <div
            onClick={() => nextPage()}
            className="h-screen text-white w-screen cursor-none bg-black bg-cover bg-center"
            style={{ backgroundImage: `url("${nasa?.hdurl}")` }}
        >
            {page == 1 && (
                <div className="h-full w-full bg-gray-900 bg-opacity-50 text-gray-200 p-12 flex items-center justify-center space-x-12">
                    <div className="font-pixel space-y-4 text-center">
                        <p className="text-9xl">{clock}</p>
                        <p className="text-4xl">
                            {day}, {date}
                        </p>
                    </div>
                </div>
            )}

            {page == 2 && (
                <div className="h-full w-full bg-gray-900 bg-opacity-90 text-gray-200 p-12 flex flex-col">
                    <div className="flex flex-row">
                        <div className="">
                            <p className="text-5xl">
                                {Math.trunc(weather?.main?.temp)} &deg;F
                            </p>
                            <p className="opacity-50">
                                <span>{weather?.main?.temp_min} &deg;F</span>
                                <span> - </span>
                                <span>{weather?.main?.temp_max} &deg;F</span>
                            </p>
                        </div>
                        <div className="flex-1"></div>
                        <div className="text-right">
                            <p className="text-5xl">{clock}</p>
                            <p className="">
                                {day}, {date}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="space-y-4">
                        <p className="font-bold font-mono text-2xl">
                            {nasa?.title}
                        </p>
                        <p className="font-mono">{nasa?.explanation}</p>
                    </div>
                </div>
            )}

            {page == 3 && <Weather />}
            {page == 4 && <Image src={nasa?.hdurl} />}
        </div>
    )
}

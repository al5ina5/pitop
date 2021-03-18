import useSWR from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'

export default function Image({ src }) {
    return (
        <div className="h-full w-full bg-gray-900 bg-opacity-50 text-gray-200 p-12 flex items-center justify-center space-x-12">
            <img src={src} className="h-full rounded" alt="" />
        </div>
    )
}

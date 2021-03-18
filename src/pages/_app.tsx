import '../styles/global.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

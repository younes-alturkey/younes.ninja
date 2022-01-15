import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import { useAppDispatch, useAppSelector } from '@/src/app/hooks'
import { useEffect } from 'react'
import { initApp } from '@/src/features/uiSlice'
import { PageHead } from '@/src/types/types'
import Header from '@/src/layout/Header'
import Main from '@/src/layout/Main'
import Footer from '@/src/layout/Footer'

export default function Layout(props: PageHead) {
    const { settings, appInitialized } = useAppSelector(state => state.ui)
    const { locale, darkMode } = settings
    const { lang } = locale
    const isAr = lang === 'ar' ? true : false

    const { title = '', keywords = '', description = '', children } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        !appInitialized && dispatch(initApp())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="relative overflow-x-hidden">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>

            <ToastContainer
                position="top-center"
                rtl={isAr}
                toastStyle={{
                    color: darkMode ? '#ffffff' : '#121317',
                    backgroundColor: darkMode ? '#121317' : '#ffffff',
                }}
                autoClose={3000}
                closeButton={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Header />
            <Main>{children}</Main>
            <Footer />
        </div>
    )
}
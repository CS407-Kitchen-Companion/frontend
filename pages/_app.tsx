import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { Provider, useDispatch } from 'react-redux'
import { wrapper } from '@lib/store/store'

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <AppShell Component={Component} {...props} />
    </Provider>
  )
}

const AppShell: FC<AppProps> = ({ Component, ...rest }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      window.scrollTo(0, 0)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      <Component {...rest} />
    </>
  )
}

export default MyApp

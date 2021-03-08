import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

// nextjs 全局配置，nextjs会将组件和页面参数传入下面的函数
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <Header currentUser={currentUser}/>
    <Component {...pageProps} />
  </div>
}

AppComponent.getInitialProps = async (appContext) => {
  try {
    const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser')
    let pageProps = {}
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    return {
      pageProps,
      ...data
    }
  } catch (error) {
    return {}
  }
}

export default AppComponent
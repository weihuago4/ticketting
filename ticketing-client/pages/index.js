import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Landing Page</h1> : <h1>You are not signed in.</h1>
}

// nextjs ssr 进行服务端渲染时会先执行组件的getInitialProps方法（只会执行一次），该函数的返回值会作为组件的初始化参数
// 需要注意的是，getInitialProps方法可能在客户端中执行（从一个界面跳转另一个界面），axios请求的域名也会变化
LandingPage.getInitialProps = async (context) => {
  try {
    const { data } = await buildClient(context).get('/api/users/currentuser')
    return data
  } catch (error) {
    return {}
  }
}

export default LandingPage
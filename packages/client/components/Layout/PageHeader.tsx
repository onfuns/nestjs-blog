import Head from 'next/head'

export default function Header() {
  return (
    <header className="flex items-center h-40">
      <Head>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="node博客系统" />
        <meta name="keywords" content="node博客,nodejs博客,博客搭建" />
        <link rel="shortcut icon" href="/image/logo.png" />
        <script src="/plugin/analysis.js" defer></script>
        <title>Nest-Blog演示系统</title>
      </Head>
      <div className="w-1000-center flex-center">
        <a href="/" className="text-size-18 font-comic">
          Nest-Blog
        </a>
        <div>
          <a href="/">首页</a>
          <a href="https://hao.onfuns.com" target="_blank" rel="noreferrer" className="ml-20">
            前端导航
          </a>
        </div>
      </div>
    </header>
  )
}

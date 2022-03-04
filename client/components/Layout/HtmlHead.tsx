import Head from 'next/head'

const HtmlHead = () => (
  <Head>
    <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="node博客系统" />
    <meta name="keywords" content="node博客,nodejs博客,博客搭建" />
    <link rel="shortcut icon" href="/images/logo.png" />
    <script src="/plugins/analysis.js" defer></script>
    <title>Nest-Blog演示系统</title>
  </Head>
)

export default HtmlHead

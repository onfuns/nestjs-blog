import dayjs from 'dayjs'

export default function Footer() {
  return (
    <div className="flex items-center h-40 border-top-1-solid-#b8c5d633]">
      <div className="w-1000-center text-center">
        {[
          { text: `©2018-${dayjs().year()} by onfuns`, href: 'https://github.com/onfuns' },
          { text: '浙ICP备15032255号-1', href: 'https://beian.miit.gov.cn/' },
        ].map(({ text, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="color-#a2a09e mr-10 text-size-12"
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  )
}

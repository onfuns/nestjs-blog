import { Carousel as AntdCarousel } from 'antd'

export default function Carousel() {
  const carouselList = [
    {
      url: 'https://hao.onfuns.com/',
      img: '/image/demo-1.png',
    },
  ]
  return (
    <AntdCarousel autoplay className="mb-10 rd-4 overflow-hidden">
      {carouselList.map((carousel, index) => (
        <a key={index} className="h-180" href={carousel.url} target="_blank" rel="noreferrer">
          <img src={carousel.img} className="w-100% h-auto" />
        </a>
      ))}
    </AntdCarousel>
  )
}

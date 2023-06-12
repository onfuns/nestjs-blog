import { Carousel as AntdCarousel } from 'antd'
import Image from 'next/image'

export default function Carousel() {
  const carouselList = [
    {
      url: 'https://hao.onfuns.com/',
      img: '/images/demo-1.png',
    },
  ]
  return (
    <AntdCarousel autoplay className="mb-10 rd-4 overflow-hidden">
      {carouselList.map((carousel, index) => (
        <a key={index} href={carousel.url} target="_blank" rel="noreferrer" className="h-180">
          <Image src={carousel.img} alt="轮播图" fill />
        </a>
      ))}
    </AntdCarousel>
  )
}

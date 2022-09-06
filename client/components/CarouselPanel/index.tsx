import { Carousel } from 'antd'
import styles from './style.module.less'

export default function CarouselPanel() {
  const carouselList = [
    {
      url: 'https://hao.onfuns.com/',
      img: '/image/demo-1.png',
    },
  ]
  return (
    <Carousel autoplay className={styles.carouselPanel}>
      {carouselList.map((carousel, index) => (
        <a key={index} className={styles.carouselItem} href={carousel.url} target="__blank">
          <img src={carousel.img} />
        </a>
      ))}
    </Carousel>
  )
}

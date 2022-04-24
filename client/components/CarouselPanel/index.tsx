import { Carousel } from 'antd'
import styles from './style.module.less'
const CarouselPanel = () => {
  const carouselList = [
    {
      url: 'https://hao.onfuns.com/',
      img: '/image/demo-1.png',
    },
  ]
  return (
    <Carousel autoplay className={styles.carouselPanel}>
      {carouselList.map((c, index) => (
        <a key={index} className={styles.carouselItem} href={c.url} target="__blank">
          <img src={c.img} />
        </a>
      ))}
    </Carousel>
  )
}

export default CarouselPanel

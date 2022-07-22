import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

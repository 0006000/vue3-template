/**
 * @desc 定时器
 * @param callback 回调函数
 * @param interval 时间间隔, ms
 * @param count 最大执行次数
 * @param delay 第一次执行的延迟, ms
 */
export default function useSchedule(callback: () => void, interval: number, count?: number = Infinity, delay?: number) {
  let num: number = 0
  if (delay === undefined) {
    const timer = setInterval(() => {
      callback()
      num++
      if (num >= count) clearInterval(timer)
    }, interval)
  } else if (delay > 0) {
    setTimeout(() => {
      callback()
      num++
      const timer = setInterval(() => {
        callback()
        if (num >= count) clearInterval(timer)
      }, interval)
    }, delay)
  }
}

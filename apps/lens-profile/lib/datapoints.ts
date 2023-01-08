import { CalendarData } from 'react-activity-calendar'

const generateDataPoints = (publications: Array<any>, year: any) => {
  const pubData = publications.reduce((acc: any, publication: any) => {
    const date = new Date(publication.createdAt)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    if (acc[key]) {
      acc[key].count += 1
      // if count >= 4, set level to 4
      acc[key].level = acc[key].count >= 4 ? 4 : acc[key].count
    } else {
      acc[key] = {
        date: key,
        count: 1,
        level: 1,
      }
    }
    return acc
  }, {})

  const yearData: CalendarData = Array(365)
    .fill(null)
    .map((_, i) => {
      const date = new Date(`${year}-01-01`)
      date.setDate(i + 1)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      return {
        date: key,
        count: pubData[key] ? pubData[key].count : 0,
        level: pubData[key] ? pubData[key].level : 0,
      }
    })
  return yearData
}

export default generateDataPoints

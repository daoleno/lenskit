import { CalendarData } from 'react-activity-calendar'
import lensClient from './lens-client'

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

  // sort yearDate by date
  yearData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return yearData
}

const cfwork = 'https://lenskit-profile.daoleno.workers.dev/'

async function fetchDataPoints(profileId: string, year: number) {
  try {
    // get datapoints from cloudflare worker, use query params
    let datapoints = await fetch(`${cfwork}?profileId=${profileId}&year=${year}`)
    // if datapoints are cached(ok && not empty array), return them, otherwise continue
    if (datapoints.ok) {
      const points = await datapoints.json()
      if (points.length > 0) {
        console.log('fetched from cache')
        return points
      }
    }

    // get publications through lens-client
    const publications = await lensClient.getAllPublications(
      {
        profileId,
        limit: 50,
      },
      new Date(`${year}-01-01`)
    )
    // construct datepoints from profile
    const points = generateDataPoints(publications, year)
    console.log('fetched from lens api')

    // call cloudflare worker to cache datapoints
    await fetch(cfwork, {
      method: 'POST',
      body: JSON.stringify({
        profileId,
        datapoints: points,
      }),
    })

    return points
  } catch (error) {
    console.log('error fetching datapoints', error)
    return { error: 'error fetching datapoints' }
  }
}

export { fetchDataPoints, generateDataPoints }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type CalendarData } from 'react-activity-calendar'
import { generateDataPoints } from '../../lib/datapoints'
import lensClient from '../../lib/lens-client'

const cfwork = 'https://lenskit-profile.daoleno.workers.dev/'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarData | { error: string }>
) {
  // get profileId from req.query
  const { profileId, year } = req.query
  if (!profileId || !year) {
    res.status(400).json({ error: 'Missing profileId or year' })
    return
  }

  // get datapoints from cloudflare worker, use query params
  let datapoints = await fetch(`${cfwork}?profileId=${profileId}&year=${year}`)
  // if datapoints are cached(ok && not empty array), return them, otherwise continue
  if (datapoints.ok) {
    const points = await datapoints.json()
    if (points.length > 0) {
      console.log('fetched from cache')
      res.status(200).json(points)
      return
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

  // return datepoints
  res.status(200).json(points)
}

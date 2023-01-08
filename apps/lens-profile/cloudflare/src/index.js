addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    // parse the request body as JSON
    const body = await request.json()

    // get the profile ID and datapoints from the request body
    const { profileId, datapoints } = body

    //  initialize an object to store the data for each year
    const dataByYear = {}

    // group the data by year
    datapoints.forEach((item) => {
      const date = new Date(item.date)
      const year = date.getFullYear()
      if (!dataByYear[year]) {
        dataByYear[year] = []
      }
      dataByYear[year].push(item)
    })

    // store the data in the Cloudflare KV store by year
    for (const year in dataByYear) {
      const dataString = JSON.stringify(dataByYear[year])
      let expirationTtl = 86400 // 1 month
      if (year === '2023') {
        expirationTtl = 3600 // 1 hour
      }
      await LENSKIT_DATAPOINTS.put(`${profileId}-${year}`, dataString, {
        expirationTtl,
      })
    }

    // return a response indicating success
    return new Response('Data stored successfully')
  } else if (request.method === 'GET') {
    const { searchParams } = new URL(request.url)

    // get the profile ID, year, and month range from the query string
    const profileId = searchParams.get('profileId')
    const year = searchParams.get('year')

    // initialize an empty array to store the data
    let data = []

    // retrieve the data for this year
    const yearData = await LENSKIT_DATAPOINTS.get(`${profileId}-${year}`, {
      cacheTtl: 3600,
    })

    // add the data to the overall data array
    if (yearData) {
      // convert the string to an object
      const cache = JSON.parse(yearData)
      data.push(...cache)
    }

    // return the data as a JSON response
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

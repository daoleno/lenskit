import { PublicationTypes, useLazyPublications } from '@lenskit/react'
import { FunctionComponent, useEffect, useState } from 'react'
import Calendar, {
  Skeleton,
  Theme,
  type CalendarData,
  type Props as CalendarProps,
} from 'react-activity-calendar'
import { generateDataPoints } from '../lib/datapoints'

export type Year = number | 'last'

export interface Props extends Omit<CalendarProps, 'data'> {
  profileId: string
  year?: Year
  transformTotalCount?: boolean
  datapoints?: CalendarData
}

export const DEFAULT_THEME: Theme = {
  level4: '#216e39',
  level3: '#30a14e',
  level2: '#40c463',
  level1: '#9be9a8',
  level0: '#ebedf0',
}

const LensCalendar: FunctionComponent<Props> = ({
  profileId,
  year,
  transformTotalCount = true,
  datapoints,

  ...props
}) => {
  const [dataPoints, setDataPoints] = useState<CalendarData | undefined>(datapoints || undefined)
  const [allPublications, setAllPublications] = useState<any>([])
  const { getAllPublications, publications, loading, error } = useLazyPublications()

  const defaultLabels = {
    totalCount: `{{count}} publications in ${year === 'last' ? 'the last year' : '{{year}}'}`,
    tooltip: '<strong>{{count}} publications</strong> on {{date}}',
  }

  useEffect(() => {
    const fetchData = async () => {
      const pubs = await getAllPublications({
        profileId: profileId,
        publicationTypes: [
          PublicationTypes.Post,
          PublicationTypes.Comment,
          PublicationTypes.Mirror,
        ],
        limit: 50,
      })
      setAllPublications(pubs)
    }
    if (dataPoints === undefined) {
      fetchData()
    }
  }, [dataPoints])

  useEffect(() => {
    console.log('allPublications', allPublications)
    if (allPublications && allPublications.length > 0) {
      const dataPoints = generateDataPoints(allPublications, year)
      console.log('datePoints', dataPoints)
      setDataPoints(dataPoints)
    }
  }, [allPublications, year])

  if (error) {
    return <p>Error: {error.message} </p>
  }

  return (
    <div className="mx-auto mt-10 grid  max-w-2xl grid-cols-1 gap-4 rounded-2xl bg-gradient-to-br from-lime-50 to-teal-100 p-7 shadow-md">
      {/* <div className="text-center text-2xl font-bold">Lens Publications in {year}</div> */}
      {loading || !dataPoints ? (
        <Skeleton {...props} loading />
      ) : (
        <Calendar
          data={dataPoints}
          theme={DEFAULT_THEME}
          blockRadius={5}
          labels={defaultLabels}
          {...props}
        />
      )}
    </div>
  )
}

export default LensCalendar

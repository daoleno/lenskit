import { usePublications } from '@lenskit/react'
import { FunctionComponent, useEffect, useState } from 'react'
import Calendar, {
  Skeleton,
  Theme,
  type CalendarData,
  type Props as CalendarProps,
} from 'react-activity-calendar'

export type Year = number | 'last'

export interface Props extends Omit<CalendarProps, 'data'> {
  profileId: string
  year?: Year
  transformTotalCount?: boolean
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
  year = '2022',
  transformTotalCount = true,
  ...props
}) => {
  const [data, setData] = useState<CalendarData | null>(null)

  const { publications, loading, error } = usePublications({
    profileId: profileId,
  })

  console.log(publications)

  // construct and fill data with publications.items.createdAt, if missing, fill with empty data

  // Set data state
  const generateFunction = (publications: any, year: any) => {
    const pubData = publications.items.reduce((acc, publication) => {
      const date = new Date(publication.createdAt)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

      if (acc[key]) {
        acc[key].count += 1
        acc[key].level += 1
      } else {
        acc[key] = {
          date: key,
          count: 1,
          level: 1,
        }
      }
      return acc
    }, {})

    console.log(pubData)

    const yearData: CalendarData = Array(365)
      .fill(null)
      .map((_, i) => {
        const date = new Date(`${year}-01-01`)
        date.setDate(i + 1)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const key = `${year}-${month.toString().padStart(2, '0')}-${day
          .toString()
          .padStart(2, '0')}`
        return {
          date: key,
          count: pubData[key] ? pubData[key].count : 0,
          level: pubData[key] ? pubData[key].count : 0,
        }
      })
    return yearData
  }

  useEffect(() => {
    if (publications) {
      const yearData = generateFunction(publications, year)
      setData(yearData)
    }
  }, [publications, year])

  if (error) {
    return <p>Error: {error.message} </p>
  }

  return (
    <div className="mx-auto mt-10 grid  max-w-2xl grid-cols-1 gap-4 rounded-2xl bg-gradient-to-br from-lime-50 to-teal-100 p-7 p-7 shadow-md shadow-md">
      <div className="text-center text-2xl font-bold">Lens Publications in {year}</div>
      {loading || !data ? (
        <Skeleton {...props} loading />
      ) : (
        <Calendar
          data={data}
          theme={DEFAULT_THEME}
          blockRadius={5}

          // labels={Object.assign({}, defaultLabels, labels)}
          // totalCount={totalCount}
          // {...props}
        />
      )}
    </div>
  )
}

export default LensCalendar

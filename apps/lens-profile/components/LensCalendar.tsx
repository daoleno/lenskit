import { FunctionComponent } from 'react'
import Calendar, {
  Day,
  Skeleton,
  Theme,
  type CalendarData,
  type Props as CalendarProps,
} from 'react-activity-calendar'

export interface Props extends Omit<CalendarProps, 'data'> {
  datapoints: CalendarData
}

export const DEFAULT_THEME: Theme = {
  level4: '#216e39',
  level3: '#30a14e',
  level2: '#40c463',
  level1: '#9be9a8',
  level0: '#ebedf0',
}

const LensCalendar: FunctionComponent<Props> = ({ datapoints, ...props }) => {
  const defaultLabels = {
    totalCount: '{{count}} publications in {{year}}',
    tooltip: '<strong>{{count}} publications</strong> on {{date}}',
  }

  // datapoints may only include some days of the year, so we need to fill in the rest
  const daysInYear = (year: number) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    return isLeapYear ? 366 : 365
  }

  const fillInMissingDays = (datapoints: CalendarData, startingDay: number): CalendarData => {
    const year = new Date(datapoints[0].date).getFullYear()
    const filledInDatapoints = Array(daysInYear(year))
      .fill(null)
      .map((_, i) => {
        const date = new Date(year, 0, i + 1 + startingDay)
        const dateString = date.toISOString().split('T')[0]
        const datapoint = datapoints.find((datapoint) => datapoint.date === dateString)
        return datapoint || ({ date: dateString, count: 0, level: 0 } as Day)
      })
    return filledInDatapoints
  }

  if (datapoints) {
    datapoints = fillInMissingDays(datapoints, 1)
  }

  return (
    <div className="mx-auto mt-10 grid  max-w-2xl grid-cols-1 gap-4 rounded-2xl bg-gradient-to-br from-lime-50 to-teal-100 p-7 shadow-md">
      {!datapoints ? (
        <Skeleton {...props} loading />
      ) : (
        <Calendar
          data={datapoints}
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

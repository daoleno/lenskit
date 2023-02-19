import { PostgrestClient } from '@supabase/postgrest-js'
import { CalendarData } from 'react-activity-calendar'

// Create a single postgrest client for interacting with database
const postgrest = new PostgrestClient(process.env.POSTGREST_URL!)

async function getPublicationsSummary(profileId: string, year: number): Promise<CalendarData> {
  const { data, error } = await postgrest.rpc('get_publications_summary', {
    profile_id: profileId,
    start_date: `${year}-01-01`,
    end_date: `${year}-12-31`,
  })

  if (error) {
    throw error
  }
  return data
}

export default postgrest

export { getPublicationsSummary }

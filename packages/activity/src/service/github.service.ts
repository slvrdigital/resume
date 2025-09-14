import { parseISO } from 'date-fns'
import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import { WeeksCollectionResourceSchema } from '../schemas/github/WeeksCollectionSchema'
import { ActivityResourceSchema, ActivitSourceEnum, type ActivityResource } from '../schemas/ActivitySchema'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME!

export async function listGithubContributions(username: string = GITHUB_USERNAME) {
  const client = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`
    },
  })

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const result = await client<GraphQlQueryResponseData>(query, { login: username })
  return WeeksCollectionResourceSchema.parse(result.user.contributionsCollection.contributionCalendar.weeks)
}

export async function listGithubContributionsAsActions(): Promise<ActivityResource[]> {
  const weeks = await listGithubContributions()

  return weeks.reduce<ActivityResource[]>((acc, week) => {
    const weekActivities = week.contributionDays.reduce<ActivityResource[]>((dayAcc, day) => {
      if (day.contributionCount > 0) {
        const activity = ActivityResourceSchema.parse({
          date: parseISO(day.date).toISOString(),
          source: ActivitSourceEnum.enum.github,
          title: `Contributed ${day.contributionCount} update${day.contributionCount > 1 ? 's' : ''} across repositories`,
          url: `https://github.com/${process.env.GITHUB_USERNAME}?tab=overview&from=${day.date}&to=${day.date}`,
        })

        dayAcc.push(activity)
      }
      return dayAcc
    }, [])

    return acc.concat(weekActivities)
  }, [])
}

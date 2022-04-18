import { parseISO, differenceInMinutes } from 'date-fns'
import { runPingJob } from 'domain/jobs/pingJob'
import { newHandler, withMethods } from 'lib/middleware'
import { NextApiRequest, NextApiResponse } from 'next'

let lastRunStart: string | undefined

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const force = Number(req.query.force)
  const forceStart = (!isNaN(force) && force) || 0
  const now = new Date().toISOString()

  if (
    lastRunStart &&
    differenceInMinutes(parseISO(lastRunStart), parseISO(now)) < 5 &&
    forceStart <= 0
  ) {
    return res.status(400).json({ message: 'Job cannot be triggered now' })
  }

  lastRunStart = now

  const { data, error } = await runPingJob()
  if (error) {
    return res.status(error.status).json(error)
  }

  return res.status(200).json(data)
}

export default newHandler(withMethods(['GET'], handler))

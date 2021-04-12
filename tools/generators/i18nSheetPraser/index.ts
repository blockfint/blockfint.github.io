import { Tree, logger } from '@nrwl/devkit'
import { GoogleSpreadsheet } from 'google-spreadsheet'
const fs = require('fs')
const path = require('path')
const keys = require('./key.json')

interface Schema {
  name: string
}
export default async function (host: Tree, schema: Schema) {
  const doc = new GoogleSpreadsheet('1nKvK2A723Lw_U6CgQ31_yN0kLd4BEEAwOPd4NyQtg1Y')

  await doc.useServiceAccountAuth({
    client_email: keys.client_email,
    private_key: keys.private_key
  })
  await doc.loadInfo() // loads document properties and worksheets

  const result = sheetConfigs.map(async ({ name, output }, index) => {
    const sheet = doc.sheetsByTitle[name]
    console.log('Loading sheet 📑 ', sheet.title)
    const data = await sheet.getRows()

    const locales = ['en', 'th']

    const mappedData = data.reduce(
      (acc, { ID, ...rest }) => {
        if (ID) {
          return {
            ...acc,
            //@ts-ignore
            ...Object.fromEntries(
              locales.map((locale) => [
                locale,
                {
                  ...(acc[locale] ?? {}),
                  [ID]: rest[locale.toUpperCase()]
                }
              ])
            )
          }
        } else return acc
      },
      { en: {}, th: {} }
    )

    locales.forEach((locale) => {
      const jsonData = JSON.stringify(mappedData[locale], null, 2)
      const rawPath = `apps/${schema.name}/locales/${locale}/${output}.json`
      fs.writeFileSync(path.resolve(rawPath), jsonData)
      console.table(mappedData[locale])
      console.log(`output: ${rawPath} result: `)
    })
    return index
  })
  await Promise.all(result)
  logger.info('🥳 Create All file success')

  return () => {}
}

const sheetConfigs = [
  {
    name: '00-Common',
    output: 'common'
  },
  {
    name: '01-Mainpage',
    output: 'home'
  },
  {
    name: '02-About',
    output: 'about'
  },
  {
    name: '03.1-Works',
    output: 'works'
  },
  {
    name: '03.2-Work-Details',
    output: 'work-details'
  },
  {
    name: '03.3-Success-stories',
    output: 'project'
  },
  ,
  {
    name: '04.1-Team',
    output: 'team'
  },
  {
    name: '04.2-Team Details',
    output: 'team-details'
  }
]

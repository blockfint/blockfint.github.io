import React from 'react'
import { typography } from '@blockfint/website/styles/typography'
import { createGlobalStyle } from 'styled-components'
import { Layout } from '@blockfint/website/components/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '@blockfint/website/next-i18next.config.js'
import { NextPage } from 'next'
import { Blog } from '@blockfint/website/containers/Blog'
import { getTags } from '@blockfint/website/api/ghostCMS'
const Global = createGlobalStyle`
body{
  ${typography}
}
`
interface Props {
  categoryList: string[]
}
const BlogPage: NextPage<Props> = ({ categoryList }) => {
  return (
    <>
      <Global />
      <Layout>
        <Blog categoryList={categoryList} />
      </Layout>
    </>
  )
}
export default BlogPage
export const getStaticProps = async ({ locale }) => {
  const result = await serverSideTranslations(locale, ['common', 'about'], nextI18NextConfig)
  const ghostCat = await getTags()
  const listCat = ['technology', 'business', 'education', 'agriculture', 'inspiration']
  const categoryList = [
    ...listCat,
    ...ghostCat
      .filter((tag) => tag.visibility === 'public' && !listCat.includes(tag.slug))
      .map(({ slug }) => {
        return slug
      })
  ]
  return {
    props: {
      ...result,
      categoryList
    },
    revalidate: 60
  }
}

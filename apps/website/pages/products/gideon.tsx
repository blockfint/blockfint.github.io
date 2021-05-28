import { Layout } from '@blockfint/website/components/layouts'
import { ProductGideon } from '@blockfint/website/containers/ProductGideon'
import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config'
import React from 'react'
import { SettingsResponse } from '@tryghost/content-api'
import { NextSeo, NextSeoProps } from 'next-seo'
import { getMeta } from '@blockfint/website/api/ghostCMS/settings'
interface Props {
  meta: SettingsResponse
}
const GideonPage: NextPage<Props> = ({ meta }) => {
  const { title, description, og_image, og_title, og_description } = meta
  const SEO = {
    title,
    description,
    openGraph: {
      title: og_title,
      description: og_description,
      images: [{ url: og_image, alt: og_title }]
    }
  } as NextSeoProps
  return (
    <Layout>
      <NextSeo {...SEO} />
      <ProductGideon />
    </Layout>
  )
}

export default GideonPage

export const getStaticProps = async ({ locale }) => {
  const result = await serverSideTranslations(locale, ['common', 'work-details'], nextI18NextConfig)
  const meta = await getMeta()
  return {
    props: {
      ...result,
      meta
    }
  }
}

import { Layout } from '@blockfint/website/components/layouts'
import { Home } from '@blockfint/website/containers/Home'
import { GetStaticProps, NextPage } from 'next'
import { getAllPosts } from '../api/ghostCMS'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js'
import { PostOrPage } from '@tryghost/content-api'
import { getMeta, Meta } from '../api/ghostCMS/settings'
import { NextSeo, NextSeoProps } from 'next-seo'

interface Props {
  AllBlogs: PostOrPage[]
  meta: Meta
}
const Homepage: NextPage<Props> = ({ AllBlogs, meta }) => {
  // const { title, description, og_image, og_title, og_description } = meta
  // const SEO = {
  //   title,
  //   description,
  //   openGraph: {
  //     title: og_title,
  //     description: og_description,
  //     images: [{ url: og_image, alt: og_title }]
  //   }
  // } as NextSeoProps
  return (
    <Layout transparent>
      {/* <NextSeo {...SEO} /> */}
      <Home blogsData={AllBlogs} />
    </Layout>
  )
}

export default Homepage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const result = await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)
  const AllBlogs = await getAllPosts({ limit: 2 })
  return {
    props: {
      ...result,
      AllBlogs
    },
    revalidate: 5
  }
}

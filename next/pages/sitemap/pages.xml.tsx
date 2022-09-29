import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const siteUrl = process.env.NEXT_SITE_URL || 'https://v-core9.com'

  return getServerSideSitemapIndex(ctx, [
    siteUrl + '/',
    siteUrl + '/about',
    siteUrl + '/login',
    siteUrl + '/home',
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }

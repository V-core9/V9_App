import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const url = (process.env.NEXT_SITE_URL || 'https://v-core9.com') + '/sitemap';

  return getServerSideSitemapIndex(ctx, [
    url + '/pages.xml',
    url + '/posts.xml',
    url + '/documentation.xml',
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }

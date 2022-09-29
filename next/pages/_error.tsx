
import type { NextApiRequest, NextApiResponse } from 'next';
import Error from 'next/error';

function ErrorPage({ statusCode }: { statusCode: number | unknown }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

ErrorPage.getInitialProps = ({ res, err }: { res: NextApiResponse, err: Error }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage

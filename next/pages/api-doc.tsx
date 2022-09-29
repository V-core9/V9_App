import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'V-core9.com Express API',
        version: '1.0.0',
        description: 'This is a Next.js REST API documentation using swagger-ui-react.',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'V-core9',
          url: 'https://github.com/v-core9',
          email: 'slavko.vuletic92@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost/api/',
          description: 'Development server',
        },
      ],
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;

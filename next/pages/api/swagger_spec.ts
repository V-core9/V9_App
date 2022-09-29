import { withSwagger } from 'next-swagger-doc';

import swaggerSpec from '../../swaggerSpec';

const swaggerHandler = withSwagger(swaggerSpec);

export default swaggerHandler();

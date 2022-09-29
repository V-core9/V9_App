import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger(require('../../swaggerSpec') || {});

export default swaggerHandler();

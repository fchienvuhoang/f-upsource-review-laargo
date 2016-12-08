/**
 * Created by vuchien on 7/19/16.
 */
import helmet from 'helmet';

export default function helmetConfig(app) {
  app.use(helmet({
    frameguard: {
      action: 'deny'
    }
  }));

// enable xss protect
  app.use(helmet.xssFilter());

  app.use(helmet.xssFilter({setOnOldIE: true}));

  app.use(helmet.hidePoweredBy());

  app.disable('x-powered-by');

  app.use(helmet.noSniff());

  process.env.NODE_ENV == "development" ?
    app.use(helmet.contentSecurityPolicy({
      directives: {
        childSrc: ["'self'"],
        formAction: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:", "la-static.laargo.vn", "www.google-analytics.com", "localhost:8082", "localhost:8081"]
      }
    }))
    :
    app.use(helmet.contentSecurityPolicy({
      directives: {
        childSrc: ["'self'"],
        formAction: ["'self'"],
        scriptSrc: ["'self'", "www.google-analytics.com", "ajax.googleapis.com"],
        connectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'self'"],
        imgSrc: ["'self'", "la-static.laargo.vn", "www.google-analytics.com", "media-source-priv.laargo.vn", "media-source.laargo.vn"]
      }
    }))
}

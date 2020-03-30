import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { environment } from 'src/environments/environment';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

var minify = require('html-minifier-terser').minify;



// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  //Provide robots.txt, sidemap is provided by the server as is dynamic
  server.get('/robots.txt', (req,res) => {
    res.sendFile(distFolder + '/robots.txt')
  });


  //AVOID RENDERING AUTH AND ADMIN PAGES AND REDIRECT HOME IF RELOAD !
  //FOR AUTH WE NEED TO RENDER all pages that we get in like email validation, oauth...
  server.get('*/auth/login', (req, res) => {
    console.log('Not rendering AUTH page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });
  server.get('*/auth/signup', (req, res) => {
    console.log('Not rendering AUTH page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });
  server.get('*/auth/reset-password', (req, res) => {
    console.log('Not rendering AUTH page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });
  server.get('*/auth/profile', (req, res) => {
    console.log('Not rendering AUTH page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });
  server.get('*/auth/notifications', (req, res) => {
    console.log('Not rendering AUTH page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });
  server.get('*/admin/**', (req, res) => {
    console.log('Not rendering ADMIN page');
    res.send('<head><meta http-equiv="refresh" content="0; url ='+ environment.mainExtURL + '" /></head><body></body>')
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    let lang = "";
    const url : string = <string>req.url;
    const found = url.match(/\/[a-z][a-z]\//g);
    if (found) {
      if (found[0])
        lang = found[0].replace(/\//gi, '');
        if (environment.languages.indexOf(lang)<0) {
          lang = environment.languages[0];
        }
    } else {
        lang = (req.acceptsLanguages(environment.languages) || environment.languages[0]) as string;
    }
    res.set('Content-Language', lang);
    res.render(indexHtml, { req, res, providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
      {provide: RESPONSE,useValue: res}] },
      (error,html) => {
        html = html.replace(/< *html +lang="[a-z][a-z]" *>/, "<html lang=\"" + lang + "\">");
        //TODO: REMOVE FOR PROD !!!
        console.log("HTML =>>");
        console.log(html.substr(0,200));
        console.log("-----------METAS--------------------");
        //for (let line of html.split('\n')) {
        //  if (line.includes('meta ')) {
        //    for (let line2 of line.split('<meta')) {
        //      if (!line2.includes('*/'))
        //      console.log('<meta ' + line2);
        //    }
        //  }
        //}
        console.log("-------------------------------");
        if (error) {
          res.statusCode = 404;
        }
        res.send(html);
       /* res.send(minify(html, {
          removeAttributeQuotes: true,
          minifyCSS:true,
          minifyJS:true,
          removeComments:true,
          collapseWhitespace:true,
          conservativeCollapse:true,
          continueOnParseError:true
        }));*/

      }
      );
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4200;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

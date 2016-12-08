import React, {PropTypes} from 'react';
import {analytics} from '../config';
import {div as keyState, idState} from '../config';
import AES from 'crypto-js/aes';

function Html({title, description, style, script, children, state}) {
  const _state = AES.encrypt(JSON.stringify(state), keyState);
  const stateString = _state.toString();
  return (
    <html className="no-js" lang="">
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
      <style id="css" dangerouslySetInnerHTML={{__html: style}}/>
    </head>
    <body>
    <div id="app" dangerouslySetInnerHTML={{__html: children}}/>
    <input id={idState} type="hidden" value={stateString}/>
    {script && (
      <script
        src={script}
      />
    )}
    <script src="/google-analytics.js"/>
    </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired,
};

export default Html;

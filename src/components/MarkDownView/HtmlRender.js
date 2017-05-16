/**
 * @flow
 */
const htmlRender = (html: string) => (
  `
  <!DOCTYPE html>\n
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
      /*

      Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>

      */

      .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #F0F0F0;
      }


      /* Base color: saturation 0; */

      .hljs,
      .hljs-subst {
        color: #444;
      }

      .hljs-comment {
        color: #888888;
      }

      .hljs-keyword,
      .hljs-attribute,
      .hljs-selector-tag,
      .hljs-meta-keyword,
      .hljs-doctag,
      .hljs-name {
        font-weight: bold;
      }


      /* User color: hue: 0 */

      .hljs-type,
      .hljs-string,
      .hljs-number,
      .hljs-selector-id,
      .hljs-selector-class,
      .hljs-quote,
      .hljs-template-tag,
      .hljs-deletion {
        color: #880000;
      }

      .hljs-title,
      .hljs-section {
        color: #880000;
        font-weight: bold;
      }

      .hljs-regexp,
      .hljs-symbol,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-link,
      .hljs-selector-attr,
      .hljs-selector-pseudo {
        color: #BC6060;
      }


      /* Language color: hue: 90; */

      .hljs-literal {
        color: #78A960;
      }

      .hljs-built_in,
      .hljs-bullet,
      .hljs-code,
      .hljs-addition {
        color: #397300;
      }


      /* Meta color: hue: 200 */

      .hljs-meta {
        color: #1f7199;
      }

      .hljs-meta-string {
        color: #4d99bf;
      }


      /* Misc effects */

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: bold;
      }


.markdown-body {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  color: #333;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body a {
  background-color: transparent;
}

.markdown-body a:active,
.markdown-body a:hover {
  outline: 0;
}

.markdown-body strong {
  font-weight: 500;
}

.markdown-body img {
  border: 0;
}

.markdown-body hr {
  box-sizing: content-box;
  height: 0;
}

.markdown-body pre {
  overflow: auto;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre {
  font-family: monospace;
  font-size: 1em;
}

.markdown-body input {
  color: inherit;
  font: inherit;
  margin: 0;
}

.markdown-body html input[disabled] {
  cursor: default;
}

.markdown-body input {
  line-height: normal;
}

.markdown-body input[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}

.markdown-body table {
  border-collapse: collapse;
  border-spacing: 0;
}

.markdown-body td,
.markdown-body th {
  padding: 0;
}

.markdown-body * {
  box-sizing: border-box;
}

.markdown-body input {
  font: 13px/1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.markdown-body a {
  color: #4078c0;
  text-decoration: none;
}

.markdown-body a:hover,
.markdown-body a:active {
  text-decoration: underline;
}

.markdown-body hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
}

.markdown-body hr::before {
  display: table;
  content: '';
}

.markdown-body hr::after {
  display: table;
  clear: both;
  content: '';
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 1.1;
}

.markdown-body blockquote {
  margin: 0;
}

.markdown-body ul,
.markdown-body ol {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body ol ol,
.markdown-body ul ol {
  list-style-type: lower-roman;
}

.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
  list-style-type: lower-alpha;
}

.markdown-body dd {
  margin-left: 0;
}

.markdown-body code {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 12px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 0;
  font: 12px Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.markdown-body > *:first-child {
  margin-top: 0 !important;
}

.markdown-body > *:last-child {
  margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 1em;
  margin-bottom: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.87);
}

.markdown-body h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  line-height: 1.25;
  border-bottom: 1px solid #eee;
  margin: 0.67em 0;
}

.markdown-body h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  line-height: 1.334;
  border-bottom: 1px solid #eee;
}

.markdown-body h3 {
  font-size: 1.25em;
  line-height: 1.4;
}

.markdown-body h4 {
  font-size: 1em;
  line-height: 1.5;
}

.markdown-body h5 {
  font-size: 1em;
  line-height: 1.715;
}

.markdown-body h6 {
  font-size: 0.75em;
  color: #777;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body hr {
  height: 4px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li > p {
  margin-top: 16px;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

.markdown-body dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-body blockquote {
  padding: 0 15px;
  color: #777;
  border-left: 4px solid #ddd;
}

.markdown-body blockquote > :first-child {
  margin-top: 0;
}

.markdown-body blockquote > :last-child {
  margin-bottom: 0;
}

.markdown-body table {
  display: block;
  width: 100%;
  overflow: auto;
  word-break: normal;
  word-break: keep-all;
}

.markdown-body table th {
  font-weight: 500;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #ddd;
}

.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.markdown-body table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

.markdown-body code {
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 3px;
}

.markdown-body code::before,
.markdown-body code::after {
  letter-spacing: -0.2em;
}

.markdown-body pre > code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border-radius: 3px;
}

.markdown-body pre {
  word-wrap: normal;
}

.markdown-body pre code {
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
  content: normal;
}

.markdown-body kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

.markdown-body kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

.markdown-body::before {
  display: table;
  content: '';
}

.markdown-body::after {
  display: table;
  clear: both;
  content: '';
}
      </style>
    </head>
    <body class='markdown-body'>
      ${html}
    </body>
  </html>
  <script>
    window.onload = function(){
      var height = document.body.clientHeight;
      window.location.hash = '#' + height;

      var links = document.getElementsByClassName('link');

         for(var i=0;i<links.length;i++){
          (function (link) {
            var href = link.getAttribute('data-href');
             link.onclick = function () {
               window.postMessage(href)
             }
          })(links[i]);
         }
    }

    // window.postRn = function (href) {
    //   window.postMessage(href)
    // }
  </script>
  `
);

export default htmlRender;

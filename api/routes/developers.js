const router = require('express').Router();
const htmlMinify = require('html-minifier-terser').minify;
const CleanCSS = require('clean-css');
const jsMinify = require('terser').minify;
const xmlMinify = require("minify-xml").minify;

const cssMinify = new CleanCSS({});

const codeMinify = async ({ code = '', language = null }) => {
  console.log('RUNNING: CODE MINIFY', { code, language });

  const result = {
    output: '',
    execTime: Date.now()
  };

  switch (language.toUpperCase()) {
    case 'HTML':
      result.output = await htmlMinify(code, {
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
      });
      break;
    case 'CSS':
      result.output = cssMinify.minify(code).styles;
      break;
    case 'JS':
      result.output = (await jsMinify(code)).code;
      break;
    case 'XML':
      result.output = xmlMinify(code, { removeComments: true });
      break;

    default:
      console.log('Unsupported Language');
      break;
  }

  result.execTime = Date.now() - result.execTime;
  result.originalSize = String(code).length;
  result.minifiedSize = String(result.output).length;
  result.efficiency = (1 - (result.minifiedSize / result.originalSize));
  return result;
};

router.post('/code-minify', async (req, res, next) => {
  try {
    const data = await codeMinify(req.body);
    res.json(data !== null ? data : {});
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require('express').Router();
const htmlMinify = require('html-minifier-terser').minify;
const CleanCSS = require('clean-css');

const cleanCss = new CleanCSS({});

const codeMinify = async ({ code = '', language = null }) => {
  console.log('RUNNING: CODE MINIFY', { code, language });

  const result = {
    output: '',
    execTime: Date.now()
  };

  switch (language) {
    case 'HTML':
      result.output = await htmlMinify(code, {
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
      });
      break;
    case 'CSS':
      result.output = cleanCss.minify(code).styles;
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

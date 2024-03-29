module.exports = {
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'linebreak-style': 0,
    'eol-last': ['error'],
    camelcase: 0,
    'max-len': [
      "error",
      {
        "ignoreComments": true
      }
    ]
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
    process.env.NODE_ENV === 'development'
      ? ['./index.html', './(src|playground)/**/*.{js,vue,ts}']
      : ['./src/**/!(App).vue', './src/**/!(*.stories).{ts,js}'],
};

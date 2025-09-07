const plugins = {};

try {
  require.resolve('tailwindcss');
  plugins.tailwindcss = {};
} catch (_) {}

try {
  require.resolve('autoprefixer');
  plugins.autoprefixer = {};
} catch (_) {}

module.exports = { plugins };

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv',['@snowpack/plugin-sass',
  {
    loadPath: './src/scss',
  }],],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  env: {
    // API_URL: 'api.google.com',
    SNOWPACK_PUBLIC_PROXY_URL:'http://localhost:8081',
    SNOWPACK_PUBLIC_BASE_URL:'http://localhost:8081',
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['24.199.99.39'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
          // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
          config.resolve.fallback = {
            fs: false,
          };
        }
    
        return config;
    },
}

module.exports = nextConfig

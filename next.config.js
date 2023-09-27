// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    /* config options here */
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.nike.com',
                port: '',

            },
            {
                protocol: 'https',
                hostname: 'freight.cargo.site',
                port: '',
            }, {
                protocol: 'https',
                hostname: 'media.about.nike.com',
                port: '',
            }
            ,
            {
                protocol: 'https',
                hostname: 'images.lifestyleasia.com',
                port: '',
            }
            ,
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'wallpapers.com',
                port: ''
            }
        ],
    },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/channels',
                permanent: false,
            },
        ]
    },
}

module.exports = nextConfig

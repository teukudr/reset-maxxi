const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.pixabay.com"]
    }
}

module.exports = nextConfig

module.exports = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
});


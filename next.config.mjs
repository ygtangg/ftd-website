/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',               
                pathname: '/public/**',
            },
        ]
    },
};

export default nextConfig;

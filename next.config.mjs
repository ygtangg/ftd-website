/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',               
                pathname: '/public/**',
            },
            {
                protocol: 'https',
                hostname: 'gpqfmstteyodfvouofgt.supabase.co',
                pathname: '/storage/v1/object/public/pictures/**',
            },
        ]
    },
};

export default nextConfig;

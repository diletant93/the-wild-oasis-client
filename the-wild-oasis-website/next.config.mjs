/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'lfijklzpszkjdjzyuoco.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/cabin-images/**',
            search: '',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/a/**',
            search: '',
        },
        ],
  },
//   output:'export'
};

export default nextConfig;

/** @type {import('next').NextConfig} */


module.exports = {
    
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: '127.0.0.1',
              pathname: '**',
            },
          ],
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/catalog',
                permanent: true,
            },
        ];
    },
}

/** @type {import('next').NextConfig} */


module.exports = {
    
    images: {
        domains: ['127.0.0.1'],
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

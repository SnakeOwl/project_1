/** @type {import('next').NextConfig} */


module.exports = {
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

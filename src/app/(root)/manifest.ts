import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bruno Kawka Portfolio',
    short_name: 'Bruno Kawka',
    description:
      "I'm a Frontend Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
    start_url: '/',
    background_color: '#101010',
    theme_color: '#101010',
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}

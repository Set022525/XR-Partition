/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=*, microphone=*, display-capture=*, xr-spatial-tracking=*',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // WebXR関連のモジュール解決
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Three.jsの最適化
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: 'raw-loader',
    });

    return config;
  },
};

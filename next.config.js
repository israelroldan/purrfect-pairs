const nextConfig = {
  basePath: "/cats",
  assetPrefix: "/cats/",
  images: {
    domains: ["cdn2.thecatapi.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/cats",
  },
}

module.exports = nextConfig


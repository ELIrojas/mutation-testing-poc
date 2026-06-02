// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   basePath:"/mutation-testing-poc",
//   images:{unoptimized:true},
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/mutation-testing-poc" : "",
  images: { unoptimized: true },
};

export default nextConfig;
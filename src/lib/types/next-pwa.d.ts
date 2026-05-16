declare module 'next-pwa' {
  interface PWAConfig {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: (string | RegExp)[];
    fallbacks?: Record<string, string>;
    runtimeCaching?: unknown[];
    reloadOnOnline?: boolean;
  }

  function nextPwa(config: PWAConfig): <T extends object>(nextConfig: T) => T;

  export default nextPwa;
}

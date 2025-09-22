import getConfig from 'next/config';

function resolveBasePath(): string {
  if (typeof window !== 'undefined') {
    const nextData = (window as any).__NEXT_DATA__;
    return (nextData?.assetPrefix as string | undefined) ?? '';
  }

  const config = getConfig?.();
  const runtimeBasePath = config?.publicRuntimeConfig?.basePath;
  return (runtimeBasePath as string | undefined) ?? process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

export function buildAssetPath(relativePath: string): string {
  const basePath = resolveBasePath();
  if (!relativePath) {
    return basePath;
  }
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${basePath}${normalized}`;
}

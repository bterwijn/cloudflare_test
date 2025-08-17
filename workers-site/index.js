import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
  // Serve assets and ensure the responses set the headers required
  // for cross-origin isolation (SharedArrayBuffer) in browsers.
  const assetResponse = await getAssetFromKV(event);
  // Clone the response so we can modify headers safely.
  const response = new Response(assetResponse.body, assetResponse);
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  return response;
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}

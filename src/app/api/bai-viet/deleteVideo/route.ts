import { uploadthingApi } from '@/lib/uploadthingServer';

export async function POST(req: Request) {
  const body = await req.json();
  const { videoKey } = body;
  if (!videoKey) {
    return { status: 400, body: { message: 'videoId is required' } };
  }

  const res = await uploadthingApi.deleteFiles([`${videoKey}`]);

  if (!res) {
    return { status: 400, body: { message: 'delete video failed' } };
  }
  return new Response(JSON.stringify({ message: 'delete video success' }), {
    status: 200,
  });
}

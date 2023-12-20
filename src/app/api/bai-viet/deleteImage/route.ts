import { uploadthingApi } from '@/lib/uploadthingServer';

export async function POST(req: Request) {
  const body = await req.json();
  const { imageKey } = body;

  if (!imageKey) {
    return { status: 400, body: { message: 'imageKey is required' } };
  }

  const res = await uploadthingApi.deleteFiles([`${imageKey}`]);

  if (!res) {
    return { status: 400, body: { message: 'delete image failed' } };
  }
  return new Response(JSON.stringify({ message: 'delete image success' }), {
    status: 200,
  });
}

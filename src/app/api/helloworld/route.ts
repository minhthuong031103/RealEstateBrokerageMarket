export async function GET(req: Request) {
  console.log(req);
  return new Response('hello world');
}

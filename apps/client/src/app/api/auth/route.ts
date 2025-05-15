import refreshAction from "@/api/refreshAction";

export async function GET(request: Request) {
  const isLogged = await refreshAction();
  if (isLogged) return new Response("Authorized", { status: 200 });
  return new Response("Unauthorized", { status: 401 });
}

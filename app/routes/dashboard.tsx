import { json, redirect, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/composants/layout";
import { getAuthUser, getUserFromSession } from "~/data/auth.server";


export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App : Pricing" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function DashboardPage() {
  const session = useLoaderData()
  return (
    <Layout session={session}>
      <div>note</div>
    </Layout>
  );
}
export async function loader({ request }: { request: any }) {
  const session = await getUserFromSession(request);
  if (!session) {
    return redirect('/login');
  }
  const user = await getAuthUser(session);
  return json({ auth:session, user });
}
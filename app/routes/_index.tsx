import type { V2_MetaFunction } from "@remix-run/node";
import Layout from "~/composants/layout";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <div>hi</div>
    </Layout>
  );
}

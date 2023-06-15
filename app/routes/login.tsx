import { V2_MetaFunction, redirect } from "@remix-run/node";
import LoginFrom from "~/composants/auth/login";
import Layout from "~/composants/layout";
import { getUserFromSession, login } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";



export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App : login" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function LoginPage() {
  return (
    <Layout session={undefined}>
      <section className="">

        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <LoginFrom />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export async function action({ request }: { request: any }) {
  // const searchParams = new URL(request.url).searchParams;
  // const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  try {
    return await login(credentials[`email`], credentials[`password`]);
  } catch (error: any) {
    return { credentials: error.message };
  }
}

export async function loader({request }:{request:any}) {
  const session = await getUserFromSession(request);
  if(session){
   return redirect('/dashboard');
  }
   return session;
 }
import { luciaPageProtector } from "@acme/lucia";

export default async function Page() {
  await luciaPageProtector();

  return (
    <>
      <h1>Signed in</h1>
    </>
  );
}

import { IconFile } from "public/icons";

export default async function Home() {
  const data = await fetch("https://api.example.com/api/user");
  const json = await data.json();

  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(json)}
      <IconFile data-testid="svg" />
    </div>
  );
}

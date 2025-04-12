import Test from "./Test";
import { IconFile } from "public/icons";

export default async function Home() {
  const data = await fetch("https://api.example.com/api/user");
  const json = await data.json();

  return (
    <div style={{ backgroundColor: "black" }}>
      <h1>Home</h1>
      <p data-testid="mswData">{JSON.stringify(json)}</p>
      <Test />
      <IconFile data-testid="svg" />
    </div>
  );
}

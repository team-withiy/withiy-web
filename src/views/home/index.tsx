import Test from "./Test";
import { IconFile } from "public/icons";

export default async function Home() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <h1>Home</h1>
      <Test />
      <IconFile data-testid="svg" />
    </div>
  );
}

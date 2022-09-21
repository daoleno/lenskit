import { ConnectButton } from "@rainbow-me/rainbowkit";
import LensMenu from "./LensMenu";

export function LensButton() {
  return (
    <div className="flex space-y-3">
      <ConnectButton />
      <LensMenu />
    </div>
  );
}

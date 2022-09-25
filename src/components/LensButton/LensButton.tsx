import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import LensPopover from "./LensPopover";

export function LensButton() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className="fixed top-16">
      {address ? <LensPopover /> : <ConnectButton />}
    </div>
  );
}

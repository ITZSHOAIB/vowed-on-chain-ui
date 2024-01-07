"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Connector } from "wagmi";

export default function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button variant="outline" disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
}

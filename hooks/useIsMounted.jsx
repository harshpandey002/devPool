import { useEffect, useState } from "react";

export default function useIsMounted() {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return mounted;
}

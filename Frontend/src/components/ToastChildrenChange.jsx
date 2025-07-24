import { useEffect } from "react";

function useToastChildrenChange(callback) {
  useEffect(() => {
    const container = document.querySelector("#_rht_toaster");
    if (!container) {
      console.warn("Toast container not found");
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          callback(mutation);
        }
      });
    });

    observer.observe(container, { childList: true });

    return () => observer.disconnect();
  }, [callback]);
}

export default useToastChildrenChange;

import { useState, useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);
  return { ref, isOpen, setIsOpen };
};

export default useClickOutside;

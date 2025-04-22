import { useState, useEffect, useRef } from "react";

export function useDropdown(): {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
} {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = (): void => setIsOpen(!isOpen);
  const close = (): void => setIsOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, toggle, close, dropdownRef };
}

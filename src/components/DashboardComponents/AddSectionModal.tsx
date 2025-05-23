import { useState } from "react";
import Button from "../../ui/Button";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sectionName: string) => Promise<void>;
}

export default function AddSectionModal({
  isOpen,
  onClose,
  onAdd,
}: AddSectionModalProps) {
  const [sectionName, setSectionName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sectionName.trim()) return;

    setIsAdding(true);
    try {
      await onAdd(sectionName.trim());
      setSectionName("");
      onClose();
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Add New Section</h3>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <input
            type="text"
            value={sectionName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSectionName(e.target.value)
            }
            placeholder="Section name (e.g., Skills, Experience)"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            autoFocus
          />
          <div className="flex justify-end gap-2 py-5">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isAdding}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isAdding}
              disabled={!sectionName.trim() || isAdding}
            >
              {isAdding ? "Adding..." : "Add Section"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

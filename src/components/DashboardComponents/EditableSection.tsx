import { useEffect, useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import Button from "../../ui/Button";

interface EditableSectionProps {
  title: string;
  content: string;
  onSave: (content: string) => Promise<void>;
}

export default function EditableSection({
  title,
  content,
  onSave,
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (editedContent === content) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onSave(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">{title}</h2>
        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} className="text-blue-500" />
          </button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="small"
              onClick={handleSave}
              disabled={isSaving}
              className="text-green-500 p-1"
            >
              <Check size={16} />
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={handleCancel}
              disabled={isSaving}
              className="text-red-500 p-1"
            >
              <X size={16} />
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <p className="text-sm text-gray-600">
          {content || `Add your ${title.toLowerCase()} information here...`}
        </p>
      ) : (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md"
          rows={4}
          placeholder={`Enter your ${title.toLowerCase()} information...`}
          disabled={isSaving}
        />
      )}
    </div>
  );
}

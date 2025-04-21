import { useEffect, useState } from "react";
import useProfileStore from "../../store/useProfileStore";
import { Check, Edit2, X } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

interface EditableSectionProps {
  title: string;
  content: string;
  onSave: (content: string) => Promise<void>;
}

function CustomEditableSection({
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
    if (e) e.preventDefault();

    setIsSaving(true);
    try {
      await onSave(editedContent);
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
          <button onClick={() => setIsEditing(true)}>
            <Edit2 size={16} className="text-blue-500" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleSave(e)
              }
              disabled={isSaving}
              className="text-green-500"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="text-red-500"
            >
              <X size={16} />
            </button>
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

export default function CustomSections() {
  const { user } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();
  const [localSections, setLocalSections] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (profile?.customSections) {
      setLocalSections(profile.customSections);
    }
  }, [profile?.customSections]);

  const handleUpdateSection = async (sectionName: string, content: string) => {
    if (!profile?.customSections) return;

    setLocalSections((prev) => ({
      ...prev,
      [sectionName]: content,
    }));

    try {
      const updatedSections = {
        ...profile.customSections,
        [sectionName]: content,
      };
      await updateProfile({
        customSections: updatedSections,
      });
    } catch (error) {
      setLocalSections(profile.customSections);
      console.error("Failed to update section:", error);
    }
  };

  if (!profile?.customSections || !user) return null;

  return (
    <>
      {Object.entries(localSections).map(([sectionName, content]) => (
        <CustomEditableSection
          key={sectionName}
          title={sectionName}
          content={content}
          onSave={(updatedContent) =>
            handleUpdateSection(sectionName, updatedContent)
          }
        />
      ))}
    </>
  );
}

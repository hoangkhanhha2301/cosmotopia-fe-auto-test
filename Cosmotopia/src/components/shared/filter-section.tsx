import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FilterSection({ title, icon, isExpanded, onToggle }: FilterSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-[10px]">
        <button onClick={onToggle} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {icon}
            <span className="text-[#4E4663] text-base font-montserrat">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-black" />
          ) : (
            <ChevronDown className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
    </div>
  );
}

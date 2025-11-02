interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

export function ActionButton({ text, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors"
    >
      {text}
    </button>
  );
}

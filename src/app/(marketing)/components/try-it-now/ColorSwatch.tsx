interface ColorSwatchProps {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
}

export function ColorSwatch({ colors, selected, onChange }: ColorSwatchProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => {
        const isActive = selected === color;
        const isLight = color === '#E5E7EB' || color === '#ffffff' || color === '#F5C542';
        return (
          <button
            key={color}
            onClick={() => onChange(color)}
            title={color}
            style={{ backgroundColor: color }}
            className={`
              w-7 h-7 rounded-full transition-all duration-150 shrink-0
              ${isLight ? 'border border-neutral-300' : ''}
              ${isActive ? 'ring-2 ring-offset-2 ring-orange-500 scale-110' : 'hover:scale-105'}
            `}
          />
        );
      })}
    </div>
  );
}
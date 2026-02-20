import { Clock, Clock10 } from "lucide-react";

export default function SelectComponent({ className, options, onChange, value, label }: { className?: string; options: { key: string, value: any }[], onChange: (value:  any) => void, value: any, label: string}) {
    return (
        <div className='space-y-2'>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                
                className={className? `${className }` : 'max-w-100 p-6 border-t border-gray-100 bg-gray-50/5 w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none'}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.key} value={option.value}>
                        {option.key}
                    </option>
                ))}
            </select>
            
        </div>
    );
}

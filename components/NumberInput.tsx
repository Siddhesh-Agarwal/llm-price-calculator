import { NumberInputProps } from "@/types/util";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function NumberInput({ id, label, value, onChange, min }: NumberInputProps) {
    return (
        <fieldset className="relative">
            <Label htmlFor={id} className="px-1 py-0.5">
                {label}
            </Label>
            <Input
                type="number"
                id={id}
                value={value}
                onChange={(e) => onChange(Math.max(min, Math.floor(Number(e.target.value))))}
                min={min}
                className="rounded flex-1 appearance-none border border-border w-full py-1 px-4 bg-secondary shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                name={id}
            />
        </fieldset>
    )
}
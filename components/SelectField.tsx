import { SelectFieldProps } from "@/types/util";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function SelectField({
    id,
    label,
    value,
    onChange,
    options,
}: SelectFieldProps) {
    return (
        <fieldset className="relative p-2">
            <Label htmlFor={id} className="px-1 py-0.5">
                {label}
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id} name={id}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </fieldset>
    );
}

import { useId } from "react";
import type { SelectFieldProps } from "@/types/util";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function SelectField({
	label,
	value,
	onChange,
	options,
}: SelectFieldProps) {
	const id = useId();
	if (options.length === 0) return null;
	const isDisabled = options.length < 2;

	return (
		<fieldset className="relative" disabled={isDisabled}>
			<Label htmlFor={id} className="px-1 py-0.5">
				{label}
			</Label>
			<Select value={value} onValueChange={onChange} disabled={isDisabled}>
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

import type { NumberInputProps } from "@/types/util";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export default function NumberInput({
	label,
	value,
	onChange,
}: NumberInputProps) {
	return (
		<Field className="relative">
			<FieldLabel>{label}</FieldLabel>
			<Input
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				type="number"
				min={0}
			/>
		</Field>
	);
}

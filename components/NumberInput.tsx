import type { NumberInputProps } from "@/types/util";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";

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

type Provider = "OpenAI" | "Claude" | "Google" | "Moonshot" | "Deepseek";
type Unit = "Tokens" | "Words" | "Characters";
type Pricing = {
	inputCostInDollarsPerMillionTokens: number;
	outputCostInDollarsPerMillionTokens: number;
};

type ProviderDetails = {
	name: Provider;
	model: string;
	price: Pricing;
};

type IOUnits = {
	inputUnits: number;
	outputUnits: number;
	numberOfCalls: number;
};

type PriceTableProps = {
	providers: ProviderDetails[];
	unit: Unit;
	currency: string;
	ioUnits: IOUnits;
	conversionRate: number;
};

type NumberInputProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
};

type SelectFieldProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: readonly string[];
};

type PriceTableFields = {
	provider: Provider;
	model: string;
	inputCost: string;
	outputCost: string;
	totalCost: string;
};

export type {
	Provider,
	Unit,
	Pricing,
	ProviderDetails,
	IOUnits,
	PriceTableProps,
	NumberInputProps,
	SelectFieldProps,
	PriceTableFields,
};

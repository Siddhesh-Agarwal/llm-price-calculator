type Provider = 'OpenAI' | 'Claude' | 'Google'
type Unit = 'Tokens' | 'Words' | 'Characters'
type Pricing = {
    inputCostInDollarsPerMillionTokens: number
    outputCostInDollarsPerMillionTokens: number
}


type ProviderDetails = {
    name: Provider
    model: string
    price: Pricing
}


type IOUnits = {
    inputUnits: number
    outputUnits: number
    numberOfCalls: number
}

interface PriceTableProps {
    providers: ProviderDetails[];
    unit: Unit;
    currency: string;
    ioUnits: IOUnits;
    conversionRate: number;
}

interface NumberInputProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
}

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: readonly string[];
}

export type { Provider, Unit, Pricing, ProviderDetails, IOUnits, PriceTableProps, NumberInputProps, SelectFieldProps }
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

export type { Provider, Unit, Pricing, ProviderDetails, IOUnits }
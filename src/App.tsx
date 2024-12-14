import { useEffect, useState } from 'react'
import GitHubIcon from "./asset/github.svg"
import HeartIcon from "./asset/heart.svg"

type Pricing = {
  inputTokenCostInDollarsPerMillionTokens: number,
  outputTokenCostInDollarsPerMillionTokens: number
}

type ProviderDetails = {
  name: 'OpenAI' | 'Claude' | 'Google',
  model: string,
  price: Pricing
}

const Providers: ProviderDetails[] = [
  {
    name: 'OpenAI',
    model: 'GPT-4o',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 2.50,
      outputTokenCostInDollarsPerMillionTokens: 10.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'GPT-4o mini',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 0.15,
      outputTokenCostInDollarsPerMillionTokens: 0.60,
    },
  },
  {
    name: 'OpenAI',
    model: 'o1 preview',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 15.00,
      outputTokenCostInDollarsPerMillionTokens: 60.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'o1 mini',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 3.00,
      outputTokenCostInDollarsPerMillionTokens: 12.00,
    },
  },
  {
    name: 'Claude',
    model: '3.5 Sonnet',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 3.00,
      outputTokenCostInDollarsPerMillionTokens: 15.00,
    },
  },
  {
    name: 'Claude',
    model: '3.5 Haiku',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 0.80,
      outputTokenCostInDollarsPerMillionTokens: 4.00,
    },
  },
  {
    name: 'Claude',
    model: '3 Opus',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 15.00,
      outputTokenCostInDollarsPerMillionTokens: 75.00,
    },
  },
  {
    name: 'Google',
    model: '1.5 Flash',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 0.075,
      outputTokenCostInDollarsPerMillionTokens: 0.30,
    }
  },
  {
    name: 'Google',
    model: '1.5 Flash-8b',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 0.0375,
      outputTokenCostInDollarsPerMillionTokens: 0.15,
    }
  },
  {
    name: 'Google',
    model: '1.0 Pro',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 0.50,
      outputTokenCostInDollarsPerMillionTokens: 1.50,
    }
  },
  {
    name: 'Google',
    model: '1.5 Pro',
    price: {
      inputTokenCostInDollarsPerMillionTokens: 1.25,
      outputTokenCostInDollarsPerMillionTokens: 5.00,
    }
  },
];

function round(number: number, precision: number): string {
  const pow = Math.pow(10, precision);
  const ans = Math.round((number / 1e6) * pow) / pow;
  // Keep exacly "precision" decimal places
  return ans.toFixed(precision);
}

function Header() {
  return (
    <header className="bg-blue-200 w-full py-2 md:py-4 mb-4 flex flex-row justify-between px-4 md:px-6">
      <h1 className='font-bold text-2xl'>
        LLM Price Calculator
      </h1>
      <a href="https://github.com/Siddhesh-Agarwal/llm-price-calculator" target="_blank" rel="noreferrer" className='hover:bg-blue-300 py-1 px-2 rounded-md'>
        <img src={GitHubIcon} alt="GitHub" className='w-6 h-6' />
      </a>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-blue-200 text-center w-full py-4">
      <h1 className='font-bold'>
        Made by <a href="https://github.com/Siddhesh-Agarwal" target="_blank" rel="noreferrer" className='underline text-blue-600'>Siddhesh Agarwal</a> with <img src={HeartIcon} alt="Heart" className='w-4 h-4 inline' />
      </h1>
    </footer>
  )
}

function App() {
  const precision = 3;
  const [inputUnit, setInputUnit] = useState<'Tokens' | 'Words' | 'Characters'>('Tokens');
  const [inputTokens, setInputTokens] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<number>(0);
  const [numberOfCalls, setNumberOfCalls] = useState<number>(1);
  const [currency, setCurrency] = useState<string>('USD');
  const [conversionRate, setConversionRate] = useState<number>(1);

  useEffect(() => {
    if (currency === 'USD') {
      setConversionRate(1);
    } else {
      fetch("https://latest.currency-api.pages.dev/v1/currencies/usd.json")
        .then((response) => response.json())
        .then((data) => {
          setConversionRate(data["usd"][currency.toLowerCase()]);
        })
    }
  }, [currency]);

  // create an input field for input tokens and output tokens and calculate the cost for each provider 
  return (
    <div className='min-h-screen flex flex-col items-center justify-between'>
      {/* Header */}
      <Header />

      <div className="container p-0">
        {/* Input and Output Tokens */}
        <div className="grid grid-cols-3 gap-4 md:gap-4">
          <fieldset className="relative">
            <label htmlFor="input-tokens" className="text-gray-700">
              Input {inputUnit}
            </label>
            <input type="number" id="input-tokens" value={inputTokens} onChange={(e) => setInputTokens(Math.floor(Number(e.target.value)))} min={0} className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono" name="input-tokens" />
          </fieldset>

          <fieldset className="relative">
            <label htmlFor="output-tokens" className="text-gray-700">
              Output {inputUnit}
            </label>
            <input type="number" id="output-tokens" value={outputTokens} onChange={(e) => setOutputTokens(Math.floor(Number(e.target.value)))} min={0} className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono" name="output-tokens" />
          </fieldset>

          <fieldset className="relative">
            <label htmlFor="call-count" className="text-gray-700">
              Number of API Calls
            </label>
            <input type="number" id="call-count" value={numberOfCalls} onChange={(e) => setNumberOfCalls(Math.floor(Number(e.target.value)))} min={1} className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono" name="call-count" />
          </fieldset>
        </div>

        <div className="flex flex-row">
          {/* Currency */}
          <fieldset className="relative p-2">
            <label htmlFor="currency" className="text-gray-700">
              Currency
            </label>
            <select id="currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-sm">
              {/* Currency */}
              <option value="AED">AED</option>
              <option value="AUD">AUD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="USD" defaultChecked>USD</option>

              {/* Crypto */}
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select>
          </fieldset>

          {/* Input Unit */}
          <fieldset className="relative p-2">
            <label htmlFor="input-unit" className="text-gray-700">
              Input Unit
            </label>
            <select id="input-unit" name="input-unit" value={inputUnit} onChange={(e) => setInputUnit(e.target.value as 'Tokens' | 'Words' | 'Characters')} className="rounded-sm">
              <option value="Tokens" defaultChecked>Tokens</option>
              <option value="Words">Words</option>
              <option value="Characters">Characters</option>
            </select>
          </fieldset>
        </div>

        {/* Result Table */}
        <table className='mt-4 w-full table-auto border rounded-lg'>
          <thead className=''>
            <tr>
              <th className='font-bold border bg-gray-50 border-black'>Provider</th>
              <th className='font-bold border bg-gray-50 border-black'>Model</th>
              <th className='font-bold border bg-gray-50 border-black'>Input Token Cost</th>
              <th className='font-bold border bg-gray-50 border-black'>Output Token Cost</th>
              <th className='font-bold border bg-gray-50 border-black'>Total Cost</th>
            </tr>
          </thead>
          <tbody className='font-mono'>
            {Providers.map((provider, index) => {
              let numberOfTokensPerUnit = 1;
              if (inputUnit === 'Words') {
                numberOfTokensPerUnit = 1.333; // 0.75 words per token
              } else if (inputUnit === 'Characters') {
                numberOfTokensPerUnit = 0.400; // 2.5 characters per token
              }
              const inputCost = provider.price.inputTokenCostInDollarsPerMillionTokens * numberOfTokensPerUnit * inputTokens * conversionRate * numberOfCalls;
              const outputCost = provider.price.outputTokenCostInDollarsPerMillionTokens * numberOfTokensPerUnit * outputTokens * conversionRate * numberOfCalls;
              return (
                <tr key={index}>
                  <td className='border px-2 py-1 text-center'>{provider.name}</td>
                  <td className='border px-2 py-1 text-center'>{provider.model}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(inputCost, precision)}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(outputCost, precision)}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(inputCost + outputCost, precision)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

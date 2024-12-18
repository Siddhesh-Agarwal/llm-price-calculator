import { useEffect, useState } from 'react'
import GitHubIcon from "./asset/github.svg"
import HeartIcon from "./asset/heart.svg"

type Pricing = {
  inputCostInDollarsPerMillionTokens: number,
  outputCostInDollarsPerMillionTokens: number
}

type ProviderDetails = {
  name: 'OpenAI' | 'Claude' | 'Google',
  model: string,
  price: Pricing
}

const Providers: ProviderDetails[] = [
  {
    name: 'OpenAI',
    model: 'gpt-3.5-turbo',
    price: {
      inputCostInDollarsPerMillionTokens: 1.00,
      outputCostInDollarsPerMillionTokens: 2.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'gpt-4',
    price: {
      inputCostInDollarsPerMillionTokens: 30.00,
      outputCostInDollarsPerMillionTokens: 60.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'gpt-4-32k',
    price: {
      inputCostInDollarsPerMillionTokens: 60.00,
      outputCostInDollarsPerMillionTokens: 120.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'gpt-4o',
    price: {
      inputCostInDollarsPerMillionTokens: 2.50,
      outputCostInDollarsPerMillionTokens: 10.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'gpt-4o-2024-05-13',
    price: {
      inputCostInDollarsPerMillionTokens: 5.00,
      outputCostInDollarsPerMillionTokens: 20.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'gpt-4o-mini',
    price: {
      inputCostInDollarsPerMillionTokens: 0.15,
      outputCostInDollarsPerMillionTokens: 0.60,
    },
  },
  {
    name: 'OpenAI',
    model: 'o1',
    price: {
      inputCostInDollarsPerMillionTokens: 15.00,
      outputCostInDollarsPerMillionTokens: 60.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'o1-mini',
    price: {
      inputCostInDollarsPerMillionTokens: 3.00,
      outputCostInDollarsPerMillionTokens: 12.00,
    },
  },
  {
    name: 'OpenAI',
    model: 'o1-preview',
    price: {
      inputCostInDollarsPerMillionTokens: 15.00,
      outputCostInDollarsPerMillionTokens: 60.00,
    },
  },
  {
    name: 'Claude',
    model: '3.5 Sonnet',
    price: {
      inputCostInDollarsPerMillionTokens: 3.00,
      outputCostInDollarsPerMillionTokens: 15.00,
    },
  },
  {
    name: 'Claude',
    model: '3.5 Haiku',
    price: {
      inputCostInDollarsPerMillionTokens: 0.80,
      outputCostInDollarsPerMillionTokens: 4.00,
    },
  },
  {
    name: 'Claude',
    model: '3 Opus',
    price: {
      inputCostInDollarsPerMillionTokens: 15.00,
      outputCostInDollarsPerMillionTokens: 75.00,
    },
  },
  {
    name: 'Google',
    model: '1.5 Flash',
    price: {
      inputCostInDollarsPerMillionTokens: 0.075,
      outputCostInDollarsPerMillionTokens: 0.30,
    }
  },
  {
    name: 'Google',
    model: '1.5 Flash-8b',
    price: {
      inputCostInDollarsPerMillionTokens: 0.0375,
      outputCostInDollarsPerMillionTokens: 0.15,
    }
  },
  {
    name: 'Google',
    model: '1.0 Pro',
    price: {
      inputCostInDollarsPerMillionTokens: 0.50,
      outputCostInDollarsPerMillionTokens: 1.50,
    }
  },
  {
    name: 'Google',
    model: '1.5 Pro',
    price: {
      inputCostInDollarsPerMillionTokens: 1.25,
      outputCostInDollarsPerMillionTokens: 5.00,
    }
  },
];

function round(number: number, precision: number): string {
  const pow = Math.pow(10, precision);
  const ans = Math.round((number / 1e6) * pow) / pow;
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
      <Header />

      <div className="container p-0">
        <div className="grid grid-cols-3 gap-4 md:gap-4">
          {[
            { id: 'input-tokens', label: 'Input', value: inputTokens, setValue: setInputTokens, min: 0 },
            { id: 'output-tokens', label: 'Output', value: outputTokens, setValue: setOutputTokens, min: 0 },
            { id: 'call-count', label: 'Number of Calls', value: numberOfCalls, setValue: setNumberOfCalls, min: 1 }
          ].map(({ id, label, value, setValue, min }) => (
            <fieldset key={id} className="relative">
              <label htmlFor={id} className="text-gray-700">
                {label} {inputUnit}
              </label>
              <input
                type="number"
                id={id}
                value={value}
                onChange={(e) => setValue(Math.floor(Number(e.target.value)))}
                min={min}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                name={id}
              />
            </fieldset>
          ))}
        </div>

        <div className="flex flex-row">
          {[
            { id: 'currency', label: 'Currency', value: currency, setValue: setCurrency, options: ['AED', 'AUD', 'EUR', 'GBP', 'INR', 'JPY', 'USD', 'BTC', 'ETH', 'SOL'] },
            { id: 'input-unit', label: 'Input Unit', value: inputUnit, setValue: setInputUnit, options: ['Tokens', 'Words', 'Characters'] }
          ].map(({ id, label, value, setValue, options }) => (
            <fieldset key={id} className="relative p-2">
              <label htmlFor={id} className="text-gray-700 mr-1">
                {label}
              </label>
              <select
                id={id}
                name={id}
                value={value}
                onChange={(e) => setValue(e.target.value as "Tokens" | "Words" | "Characters")}
                className="rounded-sm border"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </fieldset>
          ))}
        </div>

        <table className='mt-4 w-full table-auto border rounded-lg mb-2'>
          <thead>
            <tr>
              {['Provider', 'Model', 'Input Token Cost', 'Output Token Cost', 'Total Cost'].map((header) => (
                <th key={header} className='font-bold border bg-gray-50 border-black'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='font-mono'>
            {Providers.map((provider, index) => {
              const numberOfTokensPerUnit = inputUnit === 'Words' ? 1.333 : inputUnit === 'Characters' ? 0.400 : 1;
              const inputCost = provider.price.inputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * inputTokens * conversionRate * numberOfCalls;
              const outputCost = provider.price.outputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * outputTokens * conversionRate * numberOfCalls;
              const totalCost = inputCost + outputCost;
              return (
                <tr key={index}>
                  <td className='border px-2 py-1 text-center'>{provider.name}</td>
                  <td className='border px-2 py-1 text-center'>{provider.model}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(inputCost, precision)}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(outputCost, precision)}</td>
                  <td className='border px-2 py-1 text-center'>{currency} {round(totalCost, precision)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  )
}

export default App

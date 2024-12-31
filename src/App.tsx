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

type Unit = 'Tokens' | 'Words' | 'Characters'

function round(number: number, precision: number): string {
  const pow = Math.pow(10, precision);
  const ans = Math.round((number / 1e6) * pow) / pow;
  return ans.toFixed(precision);
}

function Header() {
  return (
    <header className="bg-slate-200 dark:bg-slate-800 w-full py-2 md:py-4 mb-4 flex flex-row justify-between px-4 md:px-6">
      <h1 className='font-bold text-2xl text-gray-900 dark:text-gray-100'>
        LLMPrice.fyi
      </h1>
      <a href="https://github.com/Siddhesh-Agarwal/llm-price-calculator" target="_blank" rel="noreferrer" className='hover:bg-slate-300 dark:hover:bg-slate-700 py-1 px-2 rounded-md'>
        <img src={GitHubIcon} alt="GitHub" className='w-6 h-6' />
      </a>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 text-center w-full py-4 mt-4">
      <h1 className='font-bold text-gray-900 dark:text-gray-100'>
      Made by <a href="https://github.com/Siddhesh-Agarwal" target="_blank" rel="noreferrer" className='underline text-blue-600'>Siddhesh Agarwal</a> with <img src={HeartIcon} alt="Heart" className='w-4 h-4 inline' />
      </h1>
    </footer>
  )
}

function App() {
  const precision: number = 3;
  const allowedCurrency: string[] = ['AED', 'AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'HKD', 'INR', 'JPY', 'SGD', 'USD', 'BNB', 'BTC', 'DOGE', 'ETH', 'SOL', 'USDT', 'XRP']
  
  const [providers, setProviders] = useState<ProviderDetails[]>([]);
  const [unit, setUnit] = useState<Unit>('Tokens');
  const [inputUnits, setInputUnits] = useState<number>(0);
  const [outputUnits, setOutputUnits] = useState<number>(0);
  const [numberOfCalls, setNumberOfCalls] = useState<number>(1);
  const [currency, setCurrency] = useState<string>('USD');
  const [conversionRate, setConversionRate] = useState<number>(1);

  useEffect(() => {
    if (currency === 'USD') {
      setConversionRate(1);
    } else {
      const storedData = sessionStorage.getItem('currencyData');
      let data = (storedData) ? JSON.parse(storedData) : null;
      if (data === null) {
        data = fetch("https://latest.currency-api.pages.dev/v1/currencies/usd.json")
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem('currencyData', JSON.stringify(data));
            return data;
          });
      }
      setConversionRate(data["usd"][currency.toLowerCase()]);
    }
  }, [currency]);

  useEffect(() => {
    fetch("https://api.llmprice.fyi/") // Hail Golang API
      .then((response) => response.json())
      .then((data) => {
        setProviders(data as ProviderDetails[]);
      })
  }, []);

  // create an input field for input tokens and output tokens and calculate the cost for each provider 
  return (
    <div className='min-h-screen flex flex-col items-center justify-between bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100'>
      <Header />

      <div className="container p-0">
        <p className="mb-4 text-gray-900 dark:text-gray-300 text-justify p-2">
          This calculator helps you estimate the cost of using various language models. It calculates the cost based on the number of input and output tokensalong with the number of calls you make. The cost is calculated in the currency or crypto of your choice. The input cost, output cost, and total cost are calculated for each provider.
        </p>
        <div className="grid grid-cols-3 gap-4 md:gap-4 p-2">
          {[
            { id: 'input-tokens', label: `Input ${unit}`, value: inputUnits, setValue: setInputUnits, min: 0 },
            { id: 'output-tokens', label: `Output ${unit}`, value: outputUnits, setValue: setOutputUnits, min: 0 },
            { id: 'call-count', label: 'Number of Calls', value: numberOfCalls, setValue: setNumberOfCalls, min: 1 }
          ].map(({ id, label, value, setValue, min }) => (
            <fieldset key={id} className="relative">
              <label htmlFor={id} className="text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type="number"
                id={id}
                value={value}
                onChange={(e) => setValue(Math.floor(Number(e.target.value)))}
                min={min}
                className="rounded-lg flex-1 appearance-none border border-slate-300 dark:border-slate-700 w-full py-1 px-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                name={id}
              />
            </fieldset>
          ))}
        </div>

        <div className="flex flex-row">
          {[
            { id: 'currency', label: 'Currency', value: currency, setValue: setCurrency, options: allowedCurrency },
            { id: 'input-unit', label: 'Input Unit', value: unit, setValue: setUnit, options: ['Tokens', 'Words', 'Characters'] }
          ].map(({ id, label, value, setValue, options }) => (
            <fieldset key={id} className="relative p-2">
              <label htmlFor={id} className="text-gray-700 dark:text-gray-300 mr-1">
                {label}
              </label>
              <select
                id={id}
                name={id}
                value={value}
                onChange={(e) => setValue(e.target.value as Unit)}
                className="rounded-sm border dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
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

        <table className='mt-4 w-full table-fixed border mb-2'>
          <thead>
            <tr>
              {['Provider', 'Model', `Input Cost (${currency})`, `Output Cost (${currency})`, 'Total Cost'].map((header) => (
                <th key={header} className='font-bold border bg-slate-50 dark:bg-slate-800 border-black dark:border-slate-700'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='font-mono'>
            {providers.map((provider: ProviderDetails, index: number) => {
              const numberOfTokensPerUnit = unit === 'Words' ? 1.333 : unit === 'Characters' ? 0.400 : 1;
              const inputCost = provider.price.inputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * inputUnits * conversionRate * numberOfCalls;
              const outputCost = provider.price.outputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * outputUnits * conversionRate * numberOfCalls;
              const totalCost = inputCost + outputCost;
              return (
                <tr key={index}>
                  <td className='border border-slate-300 dark:border-slate-700 dark:text-gray-200 px-2 py-1 text-center text-sm'>{provider.name}</td>
                  <td className='border border-slate-300 dark:border-slate-700 dark:text-gray-200 px-2 py-1 text-center text-sm'>{provider.model}</td>
                  <td className='border border-slate-300 dark:border-slate-700 dark:text-gray-200 px-2 py-1 text-center text-sm'>{round(inputCost, precision)}</td>
                  <td className='border border-slate-300 dark:border-slate-700 dark:text-gray-200 px-2 py-1 text-center text-sm'>{round(outputCost, precision)}</td>
                  <td className='border border-slate-300 dark:border-slate-700 dark:text-gray-200 px-2 py-1 text-center text-sm'>{round(totalCost, precision)}</td>
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

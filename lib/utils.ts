import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCost = (cost: number, precision: number): string => {
  const pow = Math.pow(10, precision);
  return (Math.round((cost / 1e6) * pow) / pow).toFixed(precision);
};

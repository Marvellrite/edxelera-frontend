export function formatMoney(amount: number | string): string {
   // Ensure it's a number
   const num = typeof amount === 'string' ? parseFloat(amount) : amount;

   if (isNaN(num)) return '0.00';

   // Format with commas and 2 decimal places
   return num.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });
}

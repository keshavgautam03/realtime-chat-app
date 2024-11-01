import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",

  ];
// export const colors = [
//   "bg-rose-500 text-rose-500 border-rose-500",
//   "bg-yellow-500 text-yellow-500 border-yellow-500",
//   "bg-teal-500 text-teal-500 border-teal-500",
//   "bg-sky-500 text-sky-500 border-sky-500",
// ];


  export const getColor = (color) => {
  if(color >= 0 && color < colors.length){
  return colors[color];
  }
  return colors[0]; 
  };
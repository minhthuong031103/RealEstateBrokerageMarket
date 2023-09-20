import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import numeral from 'numeral';
import jwt from 'jsonwebtoken';
import toast from 'react-hot-toast';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const regexPasswordSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
export const regexPasswordNumber = /[0-9]/;
export const regexPasswordUpperCase = /[A-Z]/;
export function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

export function currencyFormat(num) {
  return `${numeral(num).format('0,0')} VND`;
}
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal'
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}
export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}
export const parseJSON = (str: string, out = []) => {
  try {
    const val = JSON.parse(str);
    return val ?? out;
  } catch (error) {
    return out;
  }
};

export const verifyJwt = (token: string) => {
  console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
  let email = '';
  let name = '';
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        toast.error('Invalid token');
        return;
      }
      email = decoded?.email;
      name = decoded?.name;

      toast.error('Your account is not registered yet');
      return { email, name };
    });
  } catch (err) {
    console.log(err);
  }
  return { email, name };
};

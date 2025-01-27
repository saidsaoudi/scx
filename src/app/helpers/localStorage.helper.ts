import * as CryptoJS from 'crypto-js';
import { CRYPT_SALT } from '../config';

export class localStorageHelper {
  public static setItem(key: string, text: any): void {
    try {
      text = JSON.stringify(text);
      text = CryptoJS.AES.encrypt(text, CRYPT_SALT).toString();
      localStorage.setItem(key, text);
    } catch (error) {
      this.removeItem(key)
    }
  }

  public static getItem(key: string): any {
    let text: any;
    try {
      text = localStorage.getItem(key);
      text = CryptoJS.AES.decrypt(text, CRYPT_SALT).toString(CryptoJS.enc.Utf8);
      text = JSON.parse(text);
    } catch (error) {
      text = null;
    }
    return text;
  }

  public static removeItem(key: string): any {
    localStorage.removeItem(key);
  }

  public static clear(): any {
    localStorage.clear();
  }
}

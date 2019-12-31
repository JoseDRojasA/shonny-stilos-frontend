import * as CryptoJS from 'crypto-js';

export class EncryptUtils {
    private static keys = new Date().toLocaleDateString();

    private static encryptConfig = {
        keySize: 128 / 8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    };

    public static encrypt(value: string): string {
        try {
            const encrypted = CryptoJS.AES.encrypt(value, this.keys);
            return encrypted.toString();
        } catch (e) {
            return null;
        }
    }

    public static decrypt(value: string): string {
        try {
            const decrypted = CryptoJS.AES.decrypt(value, this.keys);
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return null;
        }
    }
}

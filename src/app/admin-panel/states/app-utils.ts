import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppUtils {
    public static guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = (Math.random() * 16) | 0; // Генерируем случайное число от 0 до 15
            const value = char === 'x'
                ? random
                : (random & 0x3) | 0x8; // Для 'y' формируем значение в диапазоне 8..b
            return value.toString(16); // Преобразуем в шестнадцатеричное значение
        });
    }

    public static generateRandomColor(): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
}

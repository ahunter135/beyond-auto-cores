import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  async get<T>(key: string): Promise<T> {
    const { value } = await Preferences.get({ key: key });
    return JSON.parse(value)
  }

  async set(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    })
  }

  async remove(key: string) {
    await Preferences.remove({ key: key });
  }
}

'use strict';

class RestaurantApiWrapper {
  _url = 'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/';
  constructor() {}

  async getRestaurants() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const restaurants = await this.fetchData('restaurants', options).catch(
      err => {
        throw new Error(err);
      }
    );
    return restaurants;
  }

  async getDailyMenu(restaurantId) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const menu = await this.fetchData(
      `restaurants/daily/${restaurantId}/'fi'`,
      options
    ).catch(err => {
      throw new Error(err);
    });
    return menu;
  }

  async fetchData(endpoint, options) {
    const req = await fetch(`${this._url}${endpoint}`, options);
    if (req.status < 200 || req.status > 299) throw new Error(req.status);

    const json = await req.json();

    return json;
  }
}

export default RestaurantApiWrapper;

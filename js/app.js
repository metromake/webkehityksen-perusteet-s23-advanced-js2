'use strict';

import RestaurantApiWrapper from './RestaurantApiWrapper.js';
import {restaurantRow, restaurantModal} from './components.js';

const filterRestaurants = (restaurants, filter = "none") => {
  switch (filter) {
    case "none":
        return restaurants;
    case "sodexo":
        return restaurants.filter(restaurant => restaurant.company === "Sodexo");
    case "compass":
        return restaurants.filter(restaurant => restaurant.company === "Compass Group");
  }
}

const render = async (restaurants) => {
  const restaurantsElement = document.getElementsByTagName('table')[0];
  restaurantsElement.innerHTML = '';
  for (const restaurant of restaurants) {
    const row = restaurantRow(restaurant);
    row.addEventListener('click', async () => {
      for (const element of document.getElementsByClassName('highlight'))
        element.classList.remove('highlight');
      row.classList.add('highlight');
      const dialog = document.getElementsByTagName('dialog')[0];
      dialog.innerHTML = '';
      dialog.appendChild(await restaurantModal(restaurant));
      dialog.showModal();
    });
    restaurantsElement.appendChild(row);
}
}

const main = async () => {
  const restaurantManager = new RestaurantApiWrapper();
  const restaurants = await restaurantManager.getRestaurants().catch(err => {
    const e = document.createElement('p');
    e.innerText = 'Error fetching restaurants';
    document.getElementsByTagName('body')[0].appendChild(e);
  });
  
  if (!restaurants) return;
  restaurants.sort((a, b) => {
    if (a.name < b.name) return -1;
  });

  const filter = document.getElementById('filter');
  filter.addEventListener('input', () => 
    render(filterRestaurants(restaurants, filter.value))
  );

  render(filterRestaurants(restaurants, filter.value));
  
};

main();

# WEB103 Project 4 - DIY Delight (Car Customizer)

Submitted by: **Carlo Ace Sagad**

About this web app: **This is a full-stack car customizer application called "DIY Delight." It allows users to design a custom car by selecting options for color, wheels, and interior. The app features a dynamic visualizer that updates the car's image in real-time and calculates the total price as options are selected. Users can create, read, update, and delete (CRUD) their saved car builds, which are stored in a PostgreSQL database hosted on Render.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `custom_cars` table.**
- [x] **Users can view multiple features of the `CustomItem` (car) they can customize (color, wheels, interior).**
- [x] **Each customizable feature has multiple options to choose from (e.g., Red, Blue, Black).**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.** (Car image changes with color selection).
- [x] **The price of the `CustomItem` (car) changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItems`.**
- [ ] _If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database._ (Note: This feature was not implemented).
- [x] **Users can view a list of all submitted `CustomItems`.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItems`.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItems`.**
- [x] **Users can update or delete `CustomItems` that have been created from the detail page.**

The following **optional** features are implemented:

- [ ] _Selecting particular options prevents incompatible options from being selected even before form submission._

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='Week 5 GIF.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **ScreenToGif** ## Notes

This was a comprehensive full-stack project. The main challenge was setting up the entire CRUD (Create, Read, Update, Delete) pipeline. This involved creating all the API endpoints on the backend (`GET`, `POST`, `PUT`, `DELETE`) and the corresponding frontend service functions to call them. Another key part was managing the state in React on the "Create" and "Edit" pages, ensuring that the price and images updated instantly based on user selections. Debugging the `cors` and `dotenv` configuration was also a critical step to ensure the client and server could communicate properly.

## License

Copyright [2025] [Carlo Ace Sagad]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the L icense is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

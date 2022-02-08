# Noroff JS assignment 4 Angular Pokemon 

Simple overview of use/purpose.

Fourth JavaScript assignment from Noroff winter 2022. Task is to create a simple pokemon catalogue where users (trainers) can also catch pokemons. 

## Description

An in-depth paragraph about your project and overview of use.

The task is to create a SPA using Angular with tree main pages.

### Landing Page
Landing page with works as a start screen where users can "log in" witch works with just username. If username already exist in database it will be fetched else a new user will be created. This is also the page that the user gets redirected to if he is not logged in.

### Trainer Page
On the trainer page all the current added pokemons to a trainers list is shown and can be deleted by clicking on the delete button.

### Pokémon Catalogue Page 
On the pokemon catalouge page a list of X pokemons is shown from the pokemon api "https://pokeapi.co/". Where the X is chooses from the pages paginator. Here the user can also by clicking on a pokemons icon add it to his list. And with the "Show more" button can get redirected to a more detaild page of the pokemon. This information is fetch from the "https://pokeapi.co/" api again. 

## Getting Started

### Dependencies

* Any modern well used web browser (chrome, firefox, edge etc.)
* Node.js
* Npm

* Angular CLI (npm i -g @angular/cli)

### Installing

* clone repository / download
* Open terminal and navigate to project folder and enter 
```
npm install
```


### Executing program

In a terminal navigate to project folder and enter

```
ng serve
```
* Navigate in a browser to http://localhost:4200/ (or other port declared by terminal if port is in use)


Or aleternatively go to this link to use the program: 
# Enter URL TO HERUKO  


## Authors

Gustav Eklund Kavtaradze [@meckan]
Simon Palmgren Arvidsson [@accez] 


## Acknowledgments

Src of pokemon ball image: https://pokemon.fandom.com/wiki/Pok%C3%A9_Ball

Src to background image : https://wallup.net/wp-content/uploads/2016/05/24/143432-nature-Pokemon.jpg
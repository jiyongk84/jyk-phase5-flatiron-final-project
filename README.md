
# Airport booking app

This is a full stack app with HTML, CSS, and Javascript with React in the frontend and Python, Flask, SQLalchemy for backend. This app is used to search and book airline tickets.


## Acknowledgements

 - [Flatiron School](https://flatironschool.com/) - For Bootcamp and Education
 - [Flask](https://flask.palletsprojects.com/en/3.0.x/)
 - [SQLAlchemy](https://docs.sqlalchemy.org/en/14/) - SQLAlchemy documentation 
 - [Google](https://www.google.com) - Searching aid for things unknown
 - [github](https://github.com) - For Repositories and enable collaboration
 - [readme.so](https://readme.so) - README template

## API Reference

JSON files were used to seed app.db database file.
No external APIs were used. They were locally created with sample airport cities and states and flight numbers, airline, flight dates.

#### Get all items

```http://localhost:3000/api/
  GET /${users}
  GET /${airports}
  GET /${flights}
  GET /${bookings}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get item

```http://localhost:5555/users
  GET /${id}
  GET /${username}
  GET /${first_name}
  GET /${last_name}

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get item




## Authors

- [Jiyong Kim](https://github.com/jiyongk84)




## Installation and running the app
Fork my repo:
- [github](https://github.com/jiyongk84/jyk-phase5-flatiron-final-project)

```bash
  git clone (forked link)

  cd jyk-phase5-flatiron-final-project

  open two terminals

  first terminal:

  pipenv shell

  cd server

  python app.py

  second terminal:

  cd client

  npm start
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


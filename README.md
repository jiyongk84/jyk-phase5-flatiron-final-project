
# Airport booking app

This is a CLI (Command line interface) based app written in Python. This app is used to support Aircraft Technicians (Any Technicians) to keep track Maintenance tasks to aid them with their day to day work in a fast paced environment without constantly looking at paper work packages.  


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
  GET /${id}
  GET /${user}
  GET /${airport}
  GET /${flight}
  GET /${booking}
  GET /${payment}
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
    
## Screenshots

![App Screenshot](coming soon)


## License

[MIT](https://choosealicense.com/licenses/mit/)


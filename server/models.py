from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)  # Store the password hash
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)

    def __init__(self, username, email, password, first_name=None, last_name=None):
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.set_password(password)

    def __repr__(self):
        return f"<User {self.username}>"

    def password_hash(self, plaintext_password):
        if not plaintext_password:
            raise ValueError("Password cannot be empty")

        hashed_password = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')
        return hashed_password

    def check_password(self, password):
        if not password:
            raise ValueError("Password cannot be empty")

        return bcrypt.check_password_hash(self._password_hash, password)

    def set_password(self, plaintext_password):
        if not plaintext_password:
            raise ValueError("Password cannot be empty")

        self._password_hash = self.password_hash(plaintext_password)


class Airport(db.Model, SerializerMixin):
    __tablename__ = 'airports'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Airport {self.name}, {self.id}>"

class Flight(db.Model, SerializerMixin):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    airline = db.Column(db.String(100), nullable=False)
    flight_date = db.Column(db.Date, nullable=False)
    departure_time = db.Column(db.Time, nullable=False)
    destination_time = db.Column(db.Time, nullable=False)
    price = db.Column(db.Float, nullable=False)
    

    # Establish a many-to-one relationship with the departure airport
    departure_airport_id = db.Column(db.Integer, db.ForeignKey('airports.id'), nullable=False)
    departure_airport = db.relationship('Airport', foreign_keys=[departure_airport_id], backref='departing_flights')

    # Establish a many-to-one relationship with the destination airport
    destination_airport_id = db.Column(db.Integer, db.ForeignKey('airports.id'), nullable=False)
    destination_airport = db.relationship('Airport', foreign_keys=[destination_airport_id], backref='arriving_flights')

    # Establish a one-to-many relationship with bookings
    bookings = db.relationship('Booking', backref='flight', lazy=True)

    def __repr__(self):
        return f"<Flight {self.name}>"

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    order_number = db.Column(db.String(20), unique=True, nullable=False)
    order_status = db.Column(db.Integer, nullable=False)  # 1 = complete, 2 = pending, 3 = cancelled

    def __repr__(self):
        return f"<Booking {self.order_number}>"

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.Integer, nullable=False)  # 1 = credit card, 2 = cash, 3 = special pay

    def __repr__(self):
        return f"<Payment {self.id}>"



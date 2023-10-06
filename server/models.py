from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f"<User {self.username}>"

class Flight(db.Model):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    airline = db.Column(db.String(100), nullable=False)
    flight_date = db.Column(db.Date, nullable=False)
    airport = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Flight {self.name}>"

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    order_number = db.Column(db.String(20), unique=True, nullable=False)
    flight_date = db.Column(db.Date, nullable=False)
    airline = db.Column(db.String(100), nullable=False)
    plane_model = db.Column(db.String(100), nullable=False)
    seat_number = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Float, nullable=False)
    order_status = db.Column(db.Integer, nullable=False)  # 1 = complete, 2 = pending, 3 = cancelled

    def __repr__(self):
        return f"<Booking {self.order_number}>"

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.Integer, nullable=False)  # 1 = credit card, 2 = cash, 3 = special pay

    def __repr__(self):
        return f"<Payment {self.id}>"


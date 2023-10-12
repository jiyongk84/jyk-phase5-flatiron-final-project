#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, Response
from flask_restful import Resource
import json, random
from sqlalchemy_serializer import SerializerMixin

# Local imports
from config import app, db, api
# Add your model imports
from models import Airport, User, Flight, Booking

# Views go here!

class AirportSearch(Resource):
    def get(self):
        airports = Airport.query.all()

        airport_data = [{
            "id": airport.id,
            "name": airport.name,
            "city": airport.city,
            "state": airport.state
        } for airport in airports]

        return airport_data, 200


class UserProfile(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id is not None:
            user = User.query.filter_by(id=user_id).first()
            if user:
                user_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
                response_data = json.dumps(user_data) 
                return Response(response=response_data, status=200, content_type="application/json")
        return Response(response=json.dumps({'error': 'Unauthorized'}), status=401, content_type="application/json")


class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')

        if not username or not password or not first_name or not last_name or not email:
            return Response(response=json.dumps({"error": "422 Unprocessable Entity"}),
                            status=422, content_type="application/json")

        user = User(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id

        user_data = {
            'user_id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }

        return Response(response=json.dumps(user_data), status=201, content_type="application/json")

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        session['user_id'] = user.id
        if user_id is not None:
            user = User.query.get(user_id)
            if user:
                response_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
                return jsonify(response_data), 200
        return {'error': 'Unauthorized'}, 401
class Login(Resource):

    def post(self):

        data = request.get_json()
        username  = data.get("username")
        password =  data.get("password")

        user = User.query.filter(User.username==username).first()

        if user and user.check_password(password):
            session["user_id"] = user.id
            response = {
                "id": user.id,
                "username": user.username
                }

            return response
        
        return {"error": "Invalid username or password"}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session.pop('user_id', None)
            return {}, 204
        else:
            return {'error': 'Unauthorized'}, 401



class FlightSearch(Resource):
    def post(self):
        
        search_data = request.get_json()
        city_name = search_data.get('city')
        
        airports = Airport.query.filter_by(city=city_name).all()
        
        airport_ids_in_city = [airport.id for airport in airports]

        matching_flights = Flight.query.filter(
            (Flight.departure_airport_id.in_(airport_ids_in_city)) |
            (Flight.destination_airport_id.in_(airport_ids_in_city))
        ).all()

        flight_data = []
        for flight in matching_flights:
            flight_dict = {
                'id': flight.id,
                'name': flight.name,
                'airline': flight.airline,
                'flight_date': str(flight.flight_date),
                'departure_time': str(flight.departure_time),
                'destination_time': str(flight.destination_time),
                'price': flight.price,
                'departure_airport_id': flight.departure_airport_id,
                'destination_airport_id': flight.destination_airport_id
            }
            flight_data.append(flight_dict)

        return flight_data, 200


class BookingFlight(Resource):
    def post(self):
        data = request.get_json()

        if not data or not isinstance(data, list):
            return {"message": "No data provided or data is not in the expected format"}, 400

        try:
            
            bookings = []

            for booking_data in data:
                user_id = booking_data.get("user_id")
                flight_id = booking_data.get("flight_id")
                order_number = booking_data.get("order_number")
                order_status = booking_data.get("order_status")

                booking = Booking(
                    user_id=user_id,
                    flight_id=flight_id,
                    order_number=order_number,
                    order_status=order_status
                )

                bookings.append(booking)

            db.session.add_all(bookings)

            db.session.commit()

            return {"message": "Booking(s) created successfully"}, 201

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

# Resource Routes
api.add_resource(UserProfile, '/api/users/profile')
api.add_resource(Signup, '/api/users/signup')
api.add_resource(CheckSession, '/api/users/checksession')
api.add_resource(Login, '/api/users/login')
api.add_resource(Logout, '/api/users/logout')
api.add_resource(BookingFlight, '/api/bookings', endpoint='bookings')
api.add_resource(BookingFlight, '/api/bookings/<int:booking_id>', endpoint='booking')
api.add_resource(FlightSearch, '/api/flights/search')
api.add_resource(AirportSearch, '/api/airports/airportsearch')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


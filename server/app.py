#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, Response
from flask_restful import Resource
import json
from sqlalchemy_serializer import SerializerMixin

# Local imports
from config import app, db, api
# Add your model imports
from models import Airport, User, Flight, Booking, Payment

# Views go here!

class AirportSearch(Resource):
    def get(self):
        # Retrieve the list of all airports (or whatever your desired logic is)
        airports = Airport.query.all()

        # Serialize airport data into a list of dictionaries
        airport_data = [{
            "id": airport.id,
            "name": airport.name,
            "city": airport.city,
            "state": airport.state
        } for airport in airports]

        # Return the serialized data as a JSON response
        return airport_data, 200


class UserProfile(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id is not None:
            user = User.query.filter_by(id=user_id).first()  # Use filter_by to retrieve the user
            if user:
                user_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
                response_data = json.dumps(user_data)  # Serialize data using json.dumps
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

        # Create a new User instance with the provided arguments
        user = User(
            username=username,
            email=email,
            password=password,  # Provide the password
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
        # Get the JSON data from the request
        search_data = request.get_json()
        # Extract search criteria (city name)
        city_name = search_data.get('city')
        
        # Retrieve all airports and filter by city
        airports = Airport.query.filter_by(city=city_name).all()

        # Get the IDs of airports in the specified city
        airport_ids_in_city = [airport.id for airport in airports]

        # Retrieve flights that depart from or arrive at airports in the specified city
        matching_flights = Flight.query.filter(
            (Flight.departure_airport_id.in_(airport_ids_in_city)) |
            (Flight.destination_airport_id.in_(airport_ids_in_city))
        ).all()

        # Create a list of dictionaries from matching_flights
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


class Booking(Resource):
    def post(self):
        # Extract booking data from the request
        data = request.get_json()
        user_id = session.get('user_id')

        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        flight_name = data.get('name')  # Assuming the key in the request is 'name'

        if not flight_name:
            return {"error": "422 Unprocessable Entity"}, 422

        # Generate an order number based on flight name
        order_number = f"FLIGHT-{flight_name.replace(' ', '-')}"

        # Create a new Booking instance with the provided data
        booking = Booking(
            user_id=user_id,
            flight_name=flight_name,  # Assuming your Booking model has a 'flight_name' field
            order_number=order_number,
            order_status=2  # Assume order status is pending (you can adjust this as needed)
        )

        # Add the new booking to the session
        db.session.add(booking)

        try:
            # Commit the changes to the database
            db.session.commit()
            return jsonify({"message": "Booking created successfully", "order_number": order_number}), 201
        except Exception as e:
            # Handle any database errors here (e.g., rollback on error)
            db.session.rollback()
            return {"error": "An error occurred while creating the booking"}, 500

    def get(self):
        user_id = session.get('user_id')

        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        # Retrieve bookings for the authenticated user
        bookings = Booking.query.filter_by(user_id=user_id).all()

        booking_data = []

        for booking in bookings:
            booking_data.append({
                'id': booking.id,
                'flight_name': booking.flight_name,
                'order_number': booking.order_number,
                'order_status': booking.order_status
            })

        return jsonify(booking_data), 200

    def delete(self, booking_id):
        user_id = session.get('user_id')

        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()

        if not booking:
            return {'error': 'Booking not found'}, 404

        db.session.delete(booking)
        db.session.commit()

        return {}, 204


# Resource Routes
api.add_resource(UserProfile, '/api/users/profile')
api.add_resource(Signup, '/api/users/signup')
api.add_resource(CheckSession, '/api/users/checksession')
api.add_resource(Login, '/api/users/login')
api.add_resource(Logout, '/api/users/logout')
api.add_resource(Booking, '/api/bookings', endpoint='bookings')
api.add_resource(Booking, '/api/bookings/<int:booking_id>', endpoint='booking')
api.add_resource(FlightSearch, '/api/flights/search')
api.add_resource(AirportSearch, '/api/airports/airportsearch')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


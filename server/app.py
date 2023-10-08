#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Airport, User, Flight, Booking, Payment

# Views go here!

class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data['password']
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')

        if not username or not password or not first_name or not last_name or not email:
            return {"error": "422 Unprocessable Entity"}, 422

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )

        user.password = password  # Assuming you have a password setter method in your User model

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

        return jsonify(user_data), 201

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
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')

            user = User.query.filter_by(username=username).first()
            if user and (password is None or user.check_password(password)):
                session['user_id'] = user.id
                response_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
                return jsonify(response_data), 200
            else:
                return {'error': 'Unauthorized'}, 401
        except Exception as e:
            return {'error': str(e)}, 500

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session.pop('user_id', None)
            return {}, 204
        else:
            return {'error': 'Unauthorized'}, 401

# Add your resource routes
api.add_resource(Signup, '/api/users/signup')
api.add_resource(CheckSession, '/api/users/checksession')
api.add_resource(Login, '/api/users/login')
api.add_resource(Logout, '/api/users/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

import os
import json
from app import app
from models import db, Airport

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed with real airport data...")

        # Construct the absolute file path to the JSON file in the root folder
        json_file_path = os.path.join(os.path.dirname(__file__), "airport_data.json")

        try:
            with open(json_file_path, 'r') as json_file:
                data = json.load(json_file)
                airport_data = data.get("airports", [])

            
            for airport_info in airport_data:
                airport = Airport(
                    name=airport_info["name"],
                    city=airport_info["city"],
                    state=airport_info["state"]
                )
                db.session.add(airport)

            
            db.session.commit()

            print(f"Seeded {len(airport_data)} real airports from {json_file_path}.")
        except Exception as e:
            print(f"Error: {str(e)}")

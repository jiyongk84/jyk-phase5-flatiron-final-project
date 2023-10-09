import random
from datetime import datetime, timedelta
from app import app  # Assuming you have your Flask app instance defined in 'app.py'
from models import db, Flight, Airport

if __name__ == '__main__':
    with app.app_context():
        print("Seeding 20 future flight information with many-to-many relationships...")

        # Define the number of future flights you want to seed
        num_flights = 20

        # Get the list of all airports from the database
        airports = Airport.query.all()

        # Define the start date for generating future flight dates (e.g., one week from the current date)
        start_date = datetime.now() + timedelta(days=7)

        for _ in range(num_flights):
            # Generate random flight details
            flight_name = f"Flight {random.randint(100, 999)}"
            flight_date = start_date + timedelta(days=random.randint(1, 30))
            departure_time = datetime.strptime(f"{random.randint(0, 23)}:{random.randint(0, 59)}", "%H:%M").time()
            destination_time = (
                datetime.combine(datetime.today(), departure_time)
                + timedelta(hours=random.randint(1, 8))
            ).time()

            # Randomly select a departure airport and a destination airport
            departure_airport = random.choice(airports)
            destination_airport = random.choice(airports)

            # Create a Flight instance with the specified airline and relationships
            flight = Flight(
                name=flight_name,
                airline="Paradise Airlines",
                flight_date=flight_date.date(),
                departure_time=departure_time,
                destination_time=destination_time,
                departure_airport=departure_airport,
                destination_airport=destination_airport
            )

            # Add the flight to the database
            db.session.add(flight)

        # Commit the changes to the database
        db.session.commit()

        print(f"Seeded {num_flights} future flights with many-to-many relationships.")

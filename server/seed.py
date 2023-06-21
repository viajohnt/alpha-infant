#!/usr/bin/env python3
from random import randint
from models import db, User, Baby, Output, Input
from app import app
from config import bcrypt

def remove_seed_data():
    print("Removing Seed Data...")
    Output.query.delete()
    Input.query.delete()
    Baby.query.delete()
    User.query.delete()
    db.session.commit()

def seed_users():
    print("Seeding Users...")
    users = []
    user_dict = {"username": "User1", "password": "password1", "avatar_url": "https://example.com/avatar1.png"}
    for i in range(5):
        user = User(
            username=user_dict["username"] + str(i),
            avatar_url=user_dict["avatar_url"]
        )
        user.password_hash = user_dict["password"]
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def seed_babies():
    print("Seeding Babies...")
    users = User.query.all()
    babies = []
    for user in users:
        for i in range(randint(1, 3)):  # Each user will have 1-3 babies
            baby = Baby(
                name='Baby' + str(i),
                user_id=user.id,
                model_path='models/baby' + str(i) + '.h5'  # Add this line to provide a default model path for each baby
            )
            babies.append(baby)
    db.session.add_all(babies)
    db.session.commit()

def seed_inputs():
    print("Seeding Inputs...")
    inputs = []
    for i in range(10):
        input = Input(
            value=randint(1, 100)
        )
        inputs.append(input)
    db.session.add_all(inputs)
    db.session.commit()

def seed_outputs():
    print("Seeding Outputs...")
    babies = Baby.query.all()
    inputs = Input.query.all()
    outputs = []
    for baby in babies:
        for input in inputs:
            output = Output(
                value=randint(1, 100),
                baby_id=baby.id,
                input_id=input.id
            )
            outputs.append(output)
    db.session.add_all(outputs)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        remove_seed_data()
        seed_users()
        seed_babies()
        seed_inputs()
        seed_outputs()
        print("Seeding Complete!")

from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models import db, User, Baby, Output, Input
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
import numpy as np
import os

class TrainModel(Resource):
    def post(self, baby_id): 
        baby = Baby.query.filter_by(id=baby_id).first()
        if not baby:
            return {"error": "Baby not found"}, 404
        
        data = request.get_json()
        X = np.array(data.get('X', []))
        Y = np.array(data.get('Y', []))
        epochs = data.get('epochs', 10)  # Default to 10 if not provided

        if X.size == 0 or Y.size == 0:
            return {"error": "Data for training is empty. Please provide training data."}, 400
        
        if os.path.isfile(baby.model_path):
            model = load_model(baby.model_path)
        else:
            model = Sequential([
                Dense(32, activation='relu', input_shape=[2]),
                Dense(1)
            ])
            model.compile(optimizer='adam', loss='mse', metrics=['mae'])
        
        # Here, we capture the training history to get loss per epoch
        history = model.fit(X, Y, epochs=epochs).history  # Use epochs from input
        model.save(baby.model_path) 
        return {'status': 'success', 'loss_per_epoch': history['loss']}

class PredictSum(Resource):
    def post(self, baby_id): 
        baby = Baby.query.filter_by(id=baby_id).first()
        if not baby:
            return {"error": "Baby not found"}, 404

        if os.path.isfile(baby.model_path):
            model = load_model(baby.model_path)
        else:
            return {"error": "Model not found. Please train the model first."}, 404

        data = request.get_json().get('data')
        if data is None:
            return {"error": "Data not found in request"}, 400

        prediction = model.predict(np.array([data]))
        return {'prediction': prediction.tolist()}

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data.get("username") or not data.get("password"):
            return {'error': 'Username and password are required.'}, 422

        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user:
            return {'error': 'Username already taken.'}, 422

        new_user = User(
            username   = data["username"],
            avatar_url = data.get("avatar_url")
        )
        new_user.password_hash = data["password"]

        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 422

class CheckSession(Resource):

    def get(self):
        if session["user_id"]:
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
    
class Login(Resource):

    def post(self):
        data = request.get_json()
        user = User.query.filter(User.username == data["username"]).first()
        if user and user.authenticate(data["password"]):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    
    def delete(self):
        if session["user_id"]:
            session["user_id"] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

class Index(Resource):

    def get(self):
        if session.get('user_id'):
            return make_response("Stream API Index", 200)
        return {'error': '401 Unauthorized'}, 401

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                username   = data["username"],
                avatar_url = data["avatar_url"]
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            return e
    
class UserById(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404
        return user.to_dict(), 200
    
    def patch(self, id):
        try:
            data = request.get_json()
            user = User.query.filter_by(id=id).first()
            if not user:
                return {"error": "User not found"}, 404
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200
        except Exception as e:
            return e

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204

class Babies(Resource):

    def get(self):
        babies = [baby.to_dict() for baby in Baby.query.all()]
        return babies, 200
    
    def post(self):
        try:
            data = request.get_json()
            new_baby = Baby(
                name = data["name"],
                user_id = data["user_id"],
            )
            db.session.add(new_baby)
            db.session.commit()
            
            new_baby.model_path = f'models/baby{new_baby.id}.h5'
            db.session.commit()

            return new_baby.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 422
        
class BabiesByUser(Resource):
    def get(self, user_id):
        babies = [baby.to_dict() for baby in Baby.query.filter_by(user_id=user_id)]
        return babies, 200

class BabyById(Resource):

    def get(self, id):
        baby = Baby.query.filter_by(id=id).first()
        if not baby:
            return {"error": "Baby not found"}, 404
        return baby.to_dict(), 200

class Outputs(Resource):

    def get(self):
        outputs = [output.to_dict() for output in Output.query.all()]
        return outputs, 200

    def post(self):
        try:
            data = request.get_json()
            new_output = Output(
                value    = data["value"],
                baby_id  = data["baby_id"],
                input_id = data["input_id"]
            )
            db.session.add(new_output)
            db.session.commit()
            return new_output.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 422

class OutputById(Resource):

    def get(self, id):
        output = Output.query.filter_by(id=id).first()
        if not output:
            return {"error": "Output not found"}, 404
        return output.to_dict(), 200

class Inputs(Resource):

    def get(self):
        inputs = [input.to_dict() for input in Input.query.all()]
        return inputs, 200
    
    def post(self):
        try:
            data = request.get_json()
            new_input = Input(
                value = data["value"]
            )
            db.session.add(new_input)
            db.session.commit()
            return new_input.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 422

class InputById(Resource):

    def get(self, id):
        input = Input.query.filter_by(id=id).first()
        if not input:
            return {"error": "Input not found"}, 404
        return input.to_dict(), 200



api.add_resource(Index, '/')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout') 
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Babies, '/babies')
api.add_resource(BabiesByUser, '/api/babies_by_user/<int:user_id>')
api.add_resource(BabyById, '/babies/<int:id>')
api.add_resource(Outputs, '/outputs')
api.add_resource(OutputById, '/outputs/<int:id>')
api.add_resource(Inputs, '/inputs')
api.add_resource(InputById, '/inputs/<int:id>')
api.add_resource(TrainModel, '/train_model/<int:baby_id>') 
api.add_resource(PredictSum, '/predict_sum/<int:baby_id>') 

if __name__ == '__main__':
    if os.path.isfile('model.h5'):
        print("Loading model...")
        model = load_model('model.h5')
    else:
        print("No model found. Please train the model first.")
    app.run(port = 5555, debug = True)
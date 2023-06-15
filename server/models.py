from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-babies.users',)

    id = Column(Integer, primary_key=True)
    username = Column(String)
    _password_hash = Column(String)
    avatar_url = Column(String)
    babies = relationship('Baby', backref='user')

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id}>'

    @validates('username')
    def validate_username(self, key, value):
        if not value:
            raise ValueError("Must have a username!")
        return value

class Baby(db.Model, SerializerMixin):
    __tablename__ = 'babies'

    serialize_rules = ('-outputs.babies',)

    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    outputs = relationship('Output', backref='baby')

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    def __repr__(self):
        return f'<Baby {self.id}>'

class Output(db.Model, SerializerMixin):
    __tablename__ = 'outputs'

    serialize_rules = ('-baby.outputs', '-inputs.outputs',)

    id = Column(Integer, primary_key=True)
    value = Column(Float)
    baby_id = Column(Integer, ForeignKey('babies.id'))
    input_id = Column(Integer, ForeignKey('inputs.id'))
    input = relationship('Input', backref='outputs')

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    def __repr__(self):
        return f'<Output {self.id}>'

class Input(db.Model, SerializerMixin):
    __tablename__ = 'inputs'

    serialize_rules = ('-outputs.inputs',)

    id = Column(Integer, primary_key=True)
    value = Column(Float)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    def __repr__(self):
        return f'<Input {self.id}>'

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime

db = SQLAlchemy()

class Staff(db.Model):
    __tablename__ = 'staff'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    designation = db.Column(db.String(50), nullable=False)
    join_date = db.Column(db.Date, nullable=False)
    address = db.Column(db.Text, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    profile_picture = db.Column(db.String(256))
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    education = db.relationship('Education', backref='staff', cascade='all, delete-orphan')
    experience = db.relationship('Experience', backref='staff', cascade='all, delete-orphan')
    courses = db.relationship('Course', backref='staff', cascade='all, delete-orphan')
    achievements = db.relationship('Achievement', backref='staff', cascade='all, delete-orphan')
    verification = db.relationship('Verification', backref='staff', uselist=False, cascade='all, delete-orphan')
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class Education(db.Model):
    __tablename__ = 'education'
    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    institution = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    cgpa = db.Column(db.Float, nullable=False)
    degree_file = db.Column(db.String(256))
    marksheet_file = db.Column(db.String(256))

class Experience(db.Model):
    __tablename__ = 'experience'
    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    organization = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    experience_file = db.Column(db.String(256))

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    platform = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    course_file = db.Column(db.String(256))

class Achievement(db.Model):
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    achievement_file = db.Column(db.String(256))

class Verification(db.Model):
    __tablename__ = 'verification'
    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    aadhaar_file = db.Column(db.String(256), nullable=True)
    appointment_file = db.Column(db.String(256), nullable=True)
    verified = db.Column(db.Boolean, default=False)

# Add this at the bottom of models/staff_model.py if using models separately

class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

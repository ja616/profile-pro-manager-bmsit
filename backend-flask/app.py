# ... [imports same as before] ...
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from models.staff_model import (
    db, Staff, Education, Experience, Course,
    Achievement, Verification, Admin
)
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
import os, uuid, json

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Cs123%40@localhost/profile_manager'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024
db.init_app(app)
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def save_file(file, subfolder):
    if not file: return None
    fname = secure_filename(f"{uuid.uuid4()}_{file.filename}")
    folder = os.path.join(app.config['UPLOAD_FOLDER'], subfolder)
    os.makedirs(folder, exist_ok=True)
    file.save(os.path.join(folder, fname))
    return fname

@app.route('/uploads/<subfolder>/<filename>')
def uploaded_file(subfolder, filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], subfolder), filename)

# --- LOGIN ROUTES ---
@app.route("/api/staff/login", methods=["POST"])
def login_staff():
    data = request.json
    staff = Staff.query.filter_by(email=data.get("email")).first()
    if not staff or not staff.verify_password(data.get("password")):
        return jsonify({"error": "Invalid email or password"}), 401
    return jsonify({
        "message": "Login successful", "staff_id": staff.id,
        "name": staff.name, "email": staff.email
    }), 200

@app.route("/api/staff/<int:staff_id>", methods=["GET"])
def get_staff_profile(staff_id):
    s = Staff.query.get_or_404(staff_id)
    return jsonify({
        "staff_id": s.id, "id": s.id,
        "name": s.name, "email": s.email,
        "phone": s.phone, "dob": s.dob.isoformat() if s.dob else None,
        "department": s.department, "designation": s.designation,
        "join_date": s.join_date.isoformat() if s.join_date else None,
        "address": s.address,
        "profile_picture": s.profile_picture,
        "education": [{
            "degree": e.degree, "institution": e.institution,
            "year": e.year, "cgpa": e.cgpa,
            "degree_file": e.degree_file, "marksheet_file": e.marksheet_file
        } for e in s.education],
        "experience": [{
            "role": e.role, "organization": e.organization,
            "duration": e.duration, "description": e.description,
            "experience_file": e.experience_file
        } for e in s.experience],
        "courses": [{
            "name": c.name, "platform": c.platform,
            "year": c.year, "course_file": c.course_file
        } for c in s.courses],
        "achievements": [{
            "title": a.title, "description": a.description,
            "year": a.year, "achievement_file": a.achievement_file
        } for a in s.achievements],
        "verification": {
            "aadhaar_file": s.verification.aadhaar_file if s.verification else None,
            "appointment_file": s.verification.appointment_file if s.verification else None
        }
    })

# --- BASIC INFO ---
@app.route("/api/staff/submit-basic-info", methods=["POST"])
def submit_basic_info():
    form = request.form
    email = form.get("email")
    if Staff.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    staff = Staff(
        name=form.get("name"), email=email, phone=form.get("phone"),
        dob=datetime.strptime(form.get("dob"), "%Y-%m-%d"),
        department=form.get("department"),
        designation=form.get("designation"),
        join_date=datetime.strptime(form.get("joinDate"), "%Y-%m-%d"),
        address=form.get("address"), password=form.get("password")
    )
    if request.files.get("profilePicture"):
        staff.profile_picture = save_file(request.files["profilePicture"], "profile_pictures")

    db.session.add(staff)
    db.session.commit()
    return jsonify({"message": "Staff registered", "staff_id": staff.id}), 201

@app.route("/api/staff/update-staff/<int:staff_id>", methods=["POST"])
def update_staff(staff_id):
    staff = Staff.query.get_or_404(staff_id)
    form = request.form
    email = form.get("email")
    if email and email != staff.email:
        other = Staff.query.filter(Staff.email == email, Staff.id != staff.id).first()
        if other: return jsonify({"error": "Email already registered"}), 400
        staff.email = email

    staff.name = form.get("name", staff.name)
    staff.phone = form.get("phone", staff.phone)
    staff.dob = datetime.strptime(form.get("dob"), "%Y-%m-%d") if form.get("dob") else staff.dob
    staff.department = form.get("department", staff.department)
    staff.designation = form.get("designation", staff.designation)
    staff.join_date = datetime.strptime(form.get("joinDate"), "%Y-%m-%d") if form.get("joinDate") else staff.join_date
    staff.address = form.get("address", staff.address)

    if request.files.get("profilePicture"):
        staff.profile_picture = save_file(request.files["profilePicture"], "profile_pictures")

    db.session.commit()
    return jsonify({"message": "Staff updated successfully", "staff_id": staff.id}), 200

# --- EDUCATION ---
@app.route("/api/staff/education", methods=["POST"])
def add_education():
    staff_id = request.form.get("staff_id")
    data = json.loads(request.form.get("education", "[]"))
    Education.query.filter_by(staff_id=staff_id).delete()
    for idx, e in enumerate(data):
        rec = Education(
            staff_id=staff_id, degree=e.get("degree"),
            institution=e.get("institution"), year=e.get("year"), cgpa=e.get("cgpa")
        )
        rec.degree_file = save_file(request.files.get(f"degreeFile{idx}"), "education") or e.get("degree_file")
        rec.marksheet_file = save_file(request.files.get(f"marksheetFile{idx}"), "education") or e.get("marksheet_file")
        db.session.add(rec)
    db.session.commit()
    return jsonify({"message": "Education saved", "staff_id": staff_id}), 200

# --- EXPERIENCE ---
@app.route("/api/staff/experience", methods=["POST"])
def add_experience():
    staff_id = request.form.get("staff_id")
    data = json.loads(request.form.get("experience", "[]"))
    Experience.query.filter_by(staff_id=staff_id).delete()
    for idx, e in enumerate(data):
        rec = Experience(
            staff_id=staff_id, role=e["role"], organization=e["organization"],
            duration=e["duration"], description=e.get("description", "")
        )
        rec.experience_file = save_file(request.files.get(f"experienceFile{idx}"), "experience") or e.get("experience_file")
        db.session.add(rec)
    db.session.commit()
    return jsonify({"message": "Experience saved", "staff_id": staff_id}), 200

# --- COURSES ---
@app.route("/api/staff/courses", methods=["POST"])
def add_courses():
    staff_id = request.form.get("staff_id")
    data = json.loads(request.form.get("courses", "[]"))
    Course.query.filter_by(staff_id=staff_id).delete()
    for idx, c in enumerate(data):
        rec = Course(
            staff_id=staff_id, name=c["name"],
            platform=c["platform"], year=c["year"]
        )
        rec.course_file = save_file(request.files.get(f"courseFile{idx}"), "courses") or c.get("course_file")
        db.session.add(rec)
    db.session.commit()
    return jsonify({"message": "Courses saved", "staff_id": staff_id}), 200

# --- ACHIEVEMENTS ---
@app.route("/api/staff/achievements", methods=["POST"])
def add_achievements():
    staff_id = request.form.get("staff_id")
    data = json.loads(request.form.get("achievements", "[]"))
    Achievement.query.filter_by(staff_id=staff_id).delete()
    for idx, a in enumerate(data):
        rec = Achievement(
            staff_id=staff_id, title=a["title"],
            description=a["description"], year=a["year"]
        )
        rec.achievement_file = save_file(request.files.get(f"achievementFile{idx}"), "achievements") or a.get("achievement_file")
        db.session.add(rec)
    db.session.commit()
    return jsonify({"message": "Achievements saved", "staff_id": staff_id}), 200

# --- VERIFICATION ---
@app.route("/api/staff/verification", methods=["POST"])
def add_verification():
    try:
        staff_id = request.form.get("staff_id")
        staff = Staff.query.get_or_404(staff_id)
        verification = staff.verification or Verification(staff_id=staff.id)

        verification.aadhaar_file = save_file(request.files.get("aadhaar_file"), "verification") or request.form.get("existing_aadhaar_file")
        verification.appointment_file = save_file(request.files.get("appointment_file"), "verification") or request.form.get("existing_appointment_file")

        if not staff.verification:
            db.session.add(verification)

        db.session.commit()
        return jsonify({"message": "Verification documents saved"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Verification upload failed", "details": str(e)}), 500

# --- ADMIN SETUP (OPTIONAL) ---
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        if not Admin.query.filter_by(username="admin").first():
            db.session.add(Admin(
                username="admin",
                password_hash=generate_password_hash("admin123")
            ))
            db.session.commit()
            print("✅ Default admin created: admin/admin123")
    app.run(debug=True)

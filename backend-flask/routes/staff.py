from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
import os

staff_bp = Blueprint("staff", __name__)
UPLOAD_FOLDER = "uploads"

@staff_bp.route("/submit-basic-info", methods=["POST"])
def submit_basic_info():
    mysql = current_app.config['MYSQL']
    data = request.form
    file = request.files.get("profilePicture")

    # Save file if it 
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)
        profile_url = f"/api/staff/uploads/{filename}"
    else:
        profile_url = None

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO staff (name, email, phone, dob, department, designation, joinDate, address, password, profilePicture)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data.get("name"),
            data.get("email"),
            data.get("phone"),
            data.get("dob"),
            data.get("department"),
            data.get("designation"),
            data.get("joinDate"),
            data.get("address"),
            data.get("password"),
            profile_url
        ))
        mysql.connection.commit()
        return jsonify({"message": "Staff registered successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@staff_bp.route("/update-staff/<int:id>", methods=["PUT"])
def update_staff(id):
    mysql = current_app.config['MYSQL']
    data = request.form
    file = request.files.get("profilePicture")

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)
        profile_url = f"/api/staff/uploads/{filename}"
    else:
        profile_url = None

    try:
        cur = mysql.connection.cursor()
        if profile_url:
            cur.execute("""
                UPDATE staff
                SET name=%s, email=%s, phone=%s, dob=%s, department=%s,
                    designation=%s, joinDate=%s, address=%s, profilePicture=%s
                WHERE id=%s
            """, (
                data.get("name"),
                data.get("email"),
                data.get("phone"),
                data.get("dob"),
                data.get("department"),
                data.get("designation"),
                data.get("joinDate"),
                data.get("address"),
                profile_url,
                id
            ))
        else:
            cur.execute("""
                UPDATE staff
                SET name=%s, email=%s, phone=%s, dob=%s, department=%s,
                    designation=%s, joinDate=%s, address=%s
                WHERE id=%s
            """, (
                data.get("name"),
                data.get("email"),
                data.get("phone"),
                data.get("dob"),
                data.get("department"),
                data.get("designation"),
                data.get("joinDate"),
                data.get("address"),
                id
            ))
        mysql.connection.commit()
        return jsonify({"message": "Staff updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@staff_bp.route("/uploads/<filename>")
def get_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

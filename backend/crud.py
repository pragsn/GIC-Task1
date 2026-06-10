from sqlalchemy.orm import Session
from models import Patient
from schemas import PatientCreate, PatientUpdate
from ai_service import generate_health_prediction

def create_patient(db: Session, patient: PatientCreate):
    remarks = generate_health_prediction(
        patient.glucose,
        patient.haemoglobin,
        patient.cholesterol
    )

    db_patient = Patient(
        full_name=patient.full_name,
        date_of_birth=patient.date_of_birth,
        email=patient.email,
        glucose=patient.glucose,
        haemoglobin=patient.haemoglobin,
        cholesterol=patient.cholesterol,
        remarks=remarks
    )

    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patients(db: Session):
    return db.query(Patient).all()

def get_patient(db: Session, patient_id: int):
    return db.query(Patient).filter(Patient.id == patient_id).first()

def update_patient(db: Session, patient_id: int, patient: PatientUpdate):
    db_patient = get_patient(db, patient_id)

    if not db_patient:
        return None

    db_patient.full_name = patient.full_name
    db_patient.date_of_birth = patient.date_of_birth
    db_patient.email = patient.email
    db_patient.glucose = patient.glucose
    db_patient.haemoglobin = patient.haemoglobin
    db_patient.cholesterol = patient.cholesterol
    db_patient.remarks = generate_health_prediction(
        patient.glucose,
        patient.haemoglobin,
        patient.cholesterol
    )

    db.commit()
    db.refresh(db_patient)
    return db_patient

def delete_patient(db: Session, patient_id: int):
    db_patient = get_patient(db, patient_id)

    if not db_patient:
        return None

    db.delete(db_patient)
    db.commit()
    return db_patient
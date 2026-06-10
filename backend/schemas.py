from pydantic import BaseModel, EmailStr, field_validator
from datetime import date

class PatientBase(BaseModel):
    full_name: str
    date_of_birth: date
    email: EmailStr
    glucose: float
    haemoglobin: float
    cholesterol: float

    @field_validator("date_of_birth")
    @classmethod
    def dob_cannot_be_future(cls, value):
        if value > date.today():
            raise ValueError("Date of birth cannot be in the future")
        return value

    @field_validator("glucose", "haemoglobin", "cholesterol")
    @classmethod
    def values_must_be_positive(cls, value):
        if value < 0:
            raise ValueError("Blood test values must be positive")
        return value

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class PatientResponse(PatientBase):
    id: int
    remarks: str

    class Config:
        from_attributes = True
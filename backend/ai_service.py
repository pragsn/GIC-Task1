import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

def generate_health_prediction(glucose: float, haemoglobin: float, cholesterol: float) -> str:
    api_key = os.getenv("GEMINI_API_KEY")

    fallback = get_rule_based_prediction(glucose, haemoglobin, cholesterol)

    if not api_key:
        return fallback

    try:
        client = genai.Client(api_key=api_key)

        prompt = f"""
        You are a healthcare risk prediction assistant.

        Patient blood test values:
        Glucose: {glucose}
        Haemoglobin: {haemoglobin}
        Cholesterol: {cholesterol}

        Give one short health risk remark in simple language.
        Do not diagnose. Mention possible risk only.
        Keep it under 30 words.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip()

    except Exception:
        return fallback


def get_rule_based_prediction(glucose: float, haemoglobin: float, cholesterol: float) -> str:
    risks = []

    if glucose > 125:
        risks.append("possible diabetes risk")
    elif glucose < 70:
        risks.append("low glucose level")

    if haemoglobin < 12:
        risks.append("possible anaemia risk")
    elif haemoglobin > 17:
        risks.append("high haemoglobin level")

    if cholesterol > 240:
        risks.append("possible cardiovascular risk")
    elif cholesterol > 200:
        risks.append("borderline cholesterol level")

    if not risks:
        return "Blood parameters appear within normal ranges. Low immediate health risk detected."

    return "Possible " + ", ".join(risks) + ". Medical consultation recommended."
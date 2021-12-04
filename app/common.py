from datetime import datetime
from flask import abort

def validate_dates(start, end):
    d1 = datetime.fromisoformat(start)
    d2 = datetime.fromisoformat(end)
    print(d1)
    print(d2)
    if d1 >= d2:
        raise ValueError
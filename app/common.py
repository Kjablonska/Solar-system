from datetime import date


def validate_dates(start, end):
    d1 = date.fromisoformat(parser_date(start))
    d2 = date.fromisoformat(parser_date(end))

    if d1 >= d2:
        raise ValueError


def parser_date(date):
    return '-'.join(i.zfill(2) for i in date.split('-'))
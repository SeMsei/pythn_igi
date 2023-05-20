from datetime import datetime
from django import template
register = template.Library()

@register.tag_function
def get_time(str):
    print(1234567)
    return str(datetime.now().strftime('%H:%M:%S'))



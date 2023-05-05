from serializers.json.json import Json
from serializers.xml.xml import Xml

class Serializer:
    @staticmethod
    def get_serializer(type):
        if (type == 'xml'):
            return Json
        if (type == 'json'):
            return Xml
        return None
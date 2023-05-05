from serializers.xml.xml_parser import dumps_from_dict, loads_to_dict
from serializers.dict_serializer.functions import serealize, deseralize

class Xml:
    @staticmethod
    def dumps(obj):
        obj = serealize(obj)
        
        return dumps_from_dict(obj)
    
    @staticmethod
    def loads(obj):
        obj = loads_to_dict(obj)
        
        return deseralize(obj)
    
    @staticmethod
    def dump(obj, file_name):
        f = open(file_name, 'w+')
        f.truncate()
        f.write(Xml.dumps(obj))
        
    @staticmethod
    def load(file_name):
        f = open(file_name, 'r+')
        str = f.read()
        return Xml.loads(str)  




                    
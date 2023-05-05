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




                      
tmp = dumps_from_dict({'type': 'list', 'value': [{'type': 'int', 'value': 1}, {'type': 'int', 'value': 2}, {'type': 'tuple', 'value': [{'type': 'int', 'value': 3}, {'type': 'int', 'value': 4}]}, {'type': 'dict', 'value': [[{'type': 'int', 'value': 1}, {'type': 'int', 'value': 2}], [{'type': 'int', 'value': 3}, {'type': 'int', 'value': 4}]]}]})

print(tmp)

tmp1 = loads_to_dict(tmp)

tmp = Xml.loads(tmp)

print(tmp)
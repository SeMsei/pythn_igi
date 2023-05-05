import sys
#from serializers.functions import serealize
#from serializers.functions import deseralize
from serializers.dict_serializer.functions import deseralize, serealize
from serializers.json.parse_json import parse_json



class Json:
    @staticmethod
    def dumps(obj):
        obj = str(serealize(obj))
        
        return obj

    @staticmethod
    def dump(obj, file_name):
        f = open(file_name, 'w+')
        f.truncate()
        f.write(Json.dumps(obj))
        
    @staticmethod
    def loads(str):
        tmp = parse_json(str)
        
        return deseralize(tmp)
    
    @staticmethod
    def load(file_name):
        f = open(file_name, 'r+')
        str = f.read()
        return Json.loads(str)  
    

                
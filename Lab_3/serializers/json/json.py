import sys
#from serializers.functions import serealize
#from serializers.functions import deseralize
from serializers.dict_serializer.functions import deseralize, serealize
from parse_json import parse_json

class Json:
    @staticmethod
    def dumps(self, obj):
        obj = str(serealize(obj))
        
        return obj

    @staticmethod
    def dump(self, obj, file_name):
        f = open(file_name, 'w+')
        f.truncate()
        f.write(self.dumps(obj))
        
    @staticmethod
    def loads(self, str):
        return deseralize(parse_json(str))
    

                
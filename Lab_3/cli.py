



from serializers.json.json import Json
from serializers.xml.xml import Xml

while (True):
    print('1: get from json')
    print('2: get from xaml')
    print('3: json to xaml')
    print('4: xaml to json')
    
    opt = input()
    
    if (opt == '1'):
        fn = input('Input file name ')
        
        print(Json.load(fn))
    elif (opt == '2'):
        fn = input("input file name ")
        
        print(Xml.load(fn))
    elif (opt == '3'):
        fn = input("input file name 1 ")
        fn1 = input('input file name 2 ')
        
        obj = Json.load(fn)
        Xml.dump(obj, fn1)
    elif (opt == '4'):
        fn = input("input file name 1 ")
        fn1 = input('input file name 2 ')
        
        obj = Xml.load(fn)
        Json.dump(obj, fn1)
    else:
        print('incorrect')
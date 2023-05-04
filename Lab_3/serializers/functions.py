import re
from pydoc import locate
import inspect
import types
#from constants import *


def serealize(obj):
    if (isinstance(obj, (int, bool, str, float, type(None), complex))):
        obj = serealize_single(obj)
    elif (isinstance(obj, (list, tuple, set, frozenset, bytes))):
        obj = serealize_list(obj)
    elif (isinstance(obj, dict)):
        obj = serealize_dict(obj)
    elif (inspect.isfunction(obj) or inspect.ismethod(obj) or isinstance(obj, types.LambdaType)):
        obj = serealize_func(obj)
    elif (inspect.iscode(obj)):
        obj = serealize_code(obj)
    elif (inspect.isclass(obj)):
        obj = ser_class_old(obj)
    elif (inspect.ismethoddescriptor(obj) or inspect.isbuiltin(obj)):
        obj = serealize_instance(obj)
    elif inspect.ismemberdescriptor(obj):
        obj = serealize_instance(obj)
    elif inspect.isgetsetdescriptor(obj):
        obj = serealize_instance(obj)
    elif isinstance(obj, type(type.__dict__)):
        obj = serealize_instance(obj)
    elif inspect.ismodule(obj):
        return serealize_module(obj)
    
    else:
        obj = serealize_object(obj)
        
    #obj = tuple((k, obj[k]) for k in obj)
    
    return obj
    
def serealize_single(obj):
    serealized = dict()
    serealized['type'] = re.findall('\'\w+\'', str(type(obj)))[0].replace('\'', '')
    serealized['value'] = obj
    
    return serealized

def serealize_list(obj):
    serealized = dict()
    serealized['type'] = re.findall('\'\w+\'', str(type(obj)))[0].replace('\'', '')
    serealized['value'] = [serealize(tmp) for tmp in obj]
    
    return serealized

def serealize_dict(obj):
    serealized = dict()
    serealized['type'] = 'dict'
    serealized['value'] = dict()
    #serealized['value'] = tuple([tuple([serealize(obj[i]), serealize(i)]) for i in obj])
    
    serealized['value'] = [[serealize(tmp), serealize(obj[tmp])] for tmp in obj]
    
    return serealized

def serealize_func(obj):
    mems = inspect.getmembers(obj)
    serealized = dict()
    serealized['type'] = str(type(obj))[8:-2]
    val = dict()
    
    for tmp in mems:
        if (tmp[0] in ['__code__', '__name__', '__defaults__']):
            val[tmp[0]] = (tmp[1])
        if tmp[0] == '__code__':
            co_names = tmp[1].__getattribute__('co_names')
            globs = obj.__getattribute__('__globals__')
            val['__globals__'] = dict()
            
            for tmp_co_names in co_names:
                if tmp_co_names == obj.__name__:
                    val['__globals__'][tmp_co_names] = obj.__name__
                elif not inspect.ismodule(tmp_co_names) \
                        and tmp_co_names in globs\
                        and tmp_co_names not in __builtins__:
                    val['__globals__'][tmp_co_names] = globs[tmp_co_names]
                    
    serealized['value'] = serealize(val)
    
    return serealized
    '''

    members = inspect.getmembers(obj)
    result = {TYPE: str(type(obj))[8:-2]}
    value = {}
    for obj in members:
        if obj[0] in FUNC_ATTRIBUTES:
            value[obj[0]] = (obj[1])
        if obj[0] == CODE:
            co_names = obj[1].__getattribute__(CO_NAMES)
            globs = obj.__getattribute__(GLOBALS)
            value[GLOBALS] = {}
            for obj2 in co_names:
                if obj2 == obj.__name__:
                    value[GLOBALS][obj2] = obj.__name__
                elif obj2 in globs and not inspect.ismodule(obj2) and obj2 not in __builtins__:
                    value[GLOBALS][obj2] = globs[obj2]
    result[VALUE] = serealize(value)

    return result
    '''
            
def serealize_code(obj):
    if (str(type(obj))[8:-2] == 'NoneType'):
        return None
    
    mems = inspect.getmembers(obj)
    
    serealized = dict()
    serealized['type'] = str(type(obj))[8:-2]
    serealized['value'] = serealize({tmp[0]: tmp[1] for tmp in mems if not callable(tmp[1])})
    
    return serealized

def serealize_instance(obj):
    mems = inspect.getmembers(obj)
    
    serealized = dict()
    serealized['type'] = str(type(obj))[8:-2]
    serealized['value'] = serealize({tmp[0]: tmp[1] for tmp in mems if not callable(tmp[1])})
    
    return serealized

def ser_class_old(obj):
    serealized = dict()
    val = dict()
    
    serealized['type'] = 'class'
    val['__name__'] = obj.__name__
    members = inspect.getmembers(obj)
    
    for tmp in members:
        if tmp[0] not in ['__class__',
                          '__getattribute__',
                          '__new__',
                          '__setattr__']:
            val[tmp[0]] = tmp[1]
    serealized['value'] = serealize(val)
    
    return serealized
    
    '''
    
    result = {'type': 'class'}
    value = {'__name__': obj.__name__}
    members = inspect.getmembers(obj)
    for tmp in members:
        if not (tmp[0] in ["__class__",
                        "__getattribute__",
                        "__new__",
                        "__setattr__",
                        ]):
            value[tmp[0]] = tmp[1]
    result['value'] = serealize(value)
    
    return result
    '''
    
    
def serealize_object(obj):
    print(type(obj))
    
    serealized = dict()
    serealized['type'] = 'object'
    serealized['value'] = serealize({'__object_type__': type(obj), '__fields__': obj.__dict__})
    
    #for key, value in inspect.getmembers(obj):
    #    if not key.startwith('__') and not inspect.isfunction(value):
    #        serealized['__fields__'][key] = serealize(value)
    
    return serealized



def serealize_module(obj):
    tmp = str(obj)
    serealized = {'type': types.get_type(obj), 'value': tmp[9:-13]}
    
    return serealized









'''
def ser_class(obj):
    res = {'type':'class', '__name__':obj.__name__}
    
    for attr in inspect.getmembers(obj):
        if attr[0] not in (
            '__mro__', '__base__', '__basicsize__',
            '__class__', '__dictoffset__', '__name__',
            '__qualname__', '__text_signature__', 
            '__itemsize__', '__flags__', '__weakrefoffset__',
            '__objclass__'
        ) and type(attr[1]) not in (
            types.WrapperDescriptorType,
            types.MethodDescriptorType,
            types.BuiltinFunctionType,
            types.MappingProxyType,
            types.GetSetDescriptorType
        ):
            attr_value = getattr(obj, attr[0])
            
            if inspect.isfunction(attr_value):
                res[attr[0]] = serealize_func(attr_value)
                
            else:
                res[attr[0]] = serealize(attr_value)
                
    res['__bases__'] =[serealize_class(tmp) for tmp in obj.__bases__]
    
    return res
'''
'''
def ser_object(obj):
    res = {'type':'object', '__class__':ser_class(obj.__class__), 'attr':{}}
    
    for key, value in inspect.getmembers(obj):
        if not key.startswith('__') and not inspect.isfunction(obj):
            res['attr'][key] = serealize(value)
            
    return res
'''

'''
def serealize_pure_cLass(obj):
    serealized = dict()
    val = dict()
    
    serealized['type'] = 'class'
    
    dict = {tmp:getattr(obj,tmp) for tmp in dir(obj)}
    
    dict['name'] = str(dict['class'])[8:-2]
    
    tup = tuple()
    
    if (str(type(obj)) != 'object'):
        if (str(type(obj))[8:-2] == 'type'):
            tup = obj.__bases__
        else:
            tup = obj.__class__.__bases__
    dict['bases'] = tup
    
    for i in range(len(tup)):
        tup[i] = {tmp:getattr(tup[i], tmp) for tmp in dir(tup[0])}
        
    dict['bases'] = tup
    
    serealized['value'] = dict
    
    return serealized
    
    '''
    
'''
def serealize_class(obj):
    serealized = dict()
    val = dict()
    
    serealized['type'] = str(type(obj))[8:-2]
    val['__name__'] = obj.__name__
    mems = inspect.getmembers(obj)
    
    for tmp in mems:
        if not (tmp[0] in ['__class__', '__getattribute__', '__new__', '__setattr__']):
            val[tmp[0]] = tmp[1]
    
    serealized['value'] = serealize(val)
    
    return serealized
'''
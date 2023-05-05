from serializers.dict_serializer.functions import serealize, deseralize
from test_var import *

def test_simple_1():
    assert a == deseralize(serealize(a))

def test_simple_2():
    assert aa == deseralize(serealize(aa))
    
def test_simple_3():
    assert b == deseralize(serealize(b))
    
def test_simple_4():
    assert bb == deseralize(serealize(bb))
    
def test_simple_5():
    assert c == deseralize(serealize(c))
    
def test_simple_6():
    assert cc == deseralize(serealize(cc))
    
def test_simple_7():
    assert d == deseralize(serealize(d))
    
def test_simple_8():
    assert dd == deseralize(serealize(dd))
    
def test_simple_9():
    assert e == deseralize(serealize(e))
    
def test_simple_10():
    assert f == deseralize(serealize(f))
    
    
def test_collection_1():
    assert list1 == deseralize(serealize(list1))

def test_collection_2():
    assert list2 == deseralize(serealize(list2))
    
def test_collection_3():
    assert list3 == deseralize(serealize(list3))
    
def test_collection_4():
    assert set1 == deseralize(serealize(set1))
    
def test_collection_5():
    assert set2 == deseralize(serealize(set2))
    
def test_collection_6():
    assert set3 == deseralize(serealize(set3))
    
def test_collection_7():
    assert tuple1 == deseralize(serealize(tuple1))
    
def test_collection_8():
    assert tuple2 == deseralize(serealize(tuple2))
    
def test_collection_9():
    assert tuple3 == deseralize(serealize(tuple3))
    
def test_collection_10():
    assert bytes1 == deseralize(serealize(bytes1))
    
def test_collection_11():
    assert dict1 == deseralize(serealize(dict1))
    
def test_collection_12():
    assert dict2 == deseralize(serealize(dict2))
    
def test_collection_13():
    assert dict3 == deseralize(serealize(dict3))
    
def test_collection_14():
    assert dict4 == deseralize(serealize(dict4))
    
def test_collection_15():
    assert dict5 == deseralize(serealize(dict5))
    
def test_func_1():
    assert func1() == deseralize(serealize(func1))()
    
def test_func_2():
    assert func2(12) == deseralize(serealize(func2))(12)
    
def test_func_3():
    assert func3(12) == deseralize(serealize(func3))(12)
    
def test_func_4():
    assert func3(12, 12, 12, 12, 12) == deseralize(serealize(func3))(12, 12, 12, 12, 12)
    
def test_func_5():
    assert func4(0.5) == deseralize(serealize(func4))(0.5)
    
def test_func_6():
    assert func5([4, 3, 2, 1]) == deseralize(serealize(func5))([4, 3, 2, 1])
    
def test_func_7():
    assert func6(5) == deseralize(serealize(func6))(5)
    
def test_func_8():
    assert func7(5) == deseralize(serealize(func7))(5)
    


def test_class_1():
    tmp = deseralize(serealize(A))
    tmp = tmp()
    a = A()
    
    assert a.a == tmp.a
    assert a.qwe(2) == tmp.qwe(2)
    
def test_class_2():
    tmp = deseralize(serealize(B))
    tmp = tmp(2)
    b = B(2)
    
    assert tmp.a == b.a
    assert tmp.func() == b.func()
    assert tmp.qwe(4) == b.qwe(4)
    
def test_class_3():
    tmp = deseralize(serealize(EEEE))
    tmp = tmp()
    eeee = EEEE()
    
    assert tmp.e == eeee.e
    assert tmp.ee == eeee.ee
    assert tmp.eee == eeee.eee
    assert tmp.eeee == eeee.eeee
    
def test_class_4():
    tmp = deseralize(serealize(first))
    f = tmp()
    fo = first()
    
    tmp = deseralize(serealize(second))
    s = tmp()
    so = second()
    
    
    assert s.func(4) == so.func(4)
    assert f.func(4) ** 4 == s.func(4)
    
def test_class_object_1():
    a = A()
    tmp = deseralize(serealize(a))
    
    assert tmp.a == a.a
    assert tmp.qwe(4) == a.qwe(4)
    
    
    
    

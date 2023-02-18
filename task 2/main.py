import utilities

a = int(input("input first number: "))
b = int(input("input second number: "))
opr = input("input operation (mul/sub/div/sum): ")

try:
    res = utilities.calc_two_num(a, b, opr)        
    print(res)
except Exception as e:
    print(e)
import utilities
import sys
import os
try:
    a = int(input("input first number: "))
    b = int(input("input second number: "))
    opr = input("input operation (mul/sub/div/sum): ")
except:
    print('wrong input')
    exit()

try:
    res = utilities.calc_two_num(a, b, opr)        
    print(res)
except Exception as e:
    print(e)
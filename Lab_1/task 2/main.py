import utilities
import sys
import os
try:
    num1 = int(input("input first number: "))
    num2 = int(input("input second number: "))
    opr = input("input operation (mul/sub/div/sum): ")
except:
    print('wrong input')
    exit()

try:
    res = utilities.calc_two_num(num1, num2, opr)        
    print(res)
except Exception as e:
    print(e)
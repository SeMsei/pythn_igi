import utilities
import sys

#//a = int(input("input first number: "))
#b = int(input("input second number: "))
#opr = input("input operation (mul/sub/div/sum): ")

a = int(sys.argv[1])
b = int(sys.argv[2])
opr = sys.argv[3]

print(a, b, opr)

try:
    res = utilities.calc_two_num(a, b, opr)        
    print(res)
except Exception as e:
    print(e)
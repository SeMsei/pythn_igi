import utilities
import sys

lst = input("input list of numbers: ").split(' ')

try:
    out_lst = utilities.get_even_numbers(lst)
    print(out_lst)
except:
    print('wrong input')
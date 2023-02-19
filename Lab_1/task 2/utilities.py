import variables

def calc_two_num(a, b, operation):
    res = 0
    
    if (operation == variables.MUL):
        return a*b
    elif (operation == variables.DIV):
        return a/b
    elif (operation == variables.SUB):
        return a-b
    elif (operation == variables.SUM):
        return a+b
    else:
        raise Exception("Incorrect operation name")
        
import variables

def calc_two_num(num1, num2, operation):
    res = 0
    
    if (operation == variables.MUL):
        return num1*num2
    elif (operation == variables.DIV):
        return num1/num2
    elif (operation == variables.SUB):
        return num1-num2
    elif (operation == variables.SUM):
        return num1+num2
    else:
        raise Exception("Incorrect operation name")
        
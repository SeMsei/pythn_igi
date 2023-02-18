import variables

def calc_two_num(a, b, operation):
    global mul
    res = 0
    if (operation == variables.mul):
        return a*b
    elif (operation == variables.div):
        return a/b
    elif (operation == variables.sub):
        return a-b
    elif (operation == variables.sum):
        return a+b
    else:
        raise Exception("Incorrect operation name")
        
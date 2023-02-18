def get_even_numbers(lst):
    lst_out = []
    
    for item in lst:
        if (int(item) % 2 == 0):
            lst_out.append(item)
            
    return lst_out
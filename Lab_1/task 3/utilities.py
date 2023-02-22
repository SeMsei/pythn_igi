def get_even_numbers(lst):
    
    lst_out = [int(item) for item in lst if int(item)%2==0]
            
    return lst_out
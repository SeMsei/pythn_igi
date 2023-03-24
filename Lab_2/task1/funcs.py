import re
import abbrevations
import unicodedata

def del_russian(text):
    i = 0
    
    while i < len(text):
        if re.search('[а-яА-Я]', text[i]):
            text = text[:i] + text[i + 1:]
        
        i += 1
        
    return text
    

def check_abbrevations(text):
    text = del_russian(text)
    
    for tmp in abbrevations.ABBREVATIONS_LIST:
        cur_pos = text.find(tmp)
        
        while (cur_pos != -1):
            if (cur_pos + len(tmp) == len(text)):
                if (tmp in ['B.A.', 'Ph.d.', 'e.g.','i.e.']):
                    text = text[:cur_pos + tmp.find('.')] + ' ' + text[cur_pos + tmp.find('.') + 1:]
            elif (text[cur_pos + len(tmp)] == ' ' and text[cur_pos + len(tmp) + 1].isupper()):
                if (tmp in ['B.A.', 'Ph.d.', 'e.g.','i.e.']):
                    text = text[:cur_pos + tmp.find('.')] + ' ' + text[cur_pos + tmp.find('.') + 1:]
            else:
                if (tmp in ['B.A.', 'Ph.d.', 'e.g.','i.e.']):
                    text = text[:cur_pos + len(tmp) - 1] + ' ' + text[cur_pos + len(tmp):]
                    text = text[:cur_pos + tmp.find('.')] + ' ' + text[cur_pos + tmp.find('.') + 1:]
                else:
                    text = text[:cur_pos + len(tmp) - 1] + text[cur_pos + len(tmp):]
            
            cur_pos = text.find(tmp, cur_pos + 1)
    
    for tmp in abbrevations.FORMAL_ABBREVATIONS:
        cur_pos = text.find(tmp)
        
        while (cur_pos != -1):
            text = text[:cur_pos + len(tmp) - 1] + text[cur_pos + len(tmp):]
            cur_pos = text.find(tmp, cur_pos + 1)
            
    return text

def check_initials(text):
    text = del_russian(text)
    
    for tmp in abbrevations.INITIALS:
        matches = re.finditer(tmp, text)
        
        index = [(match.start(), match.end()) for match in matches]
        if len(index) == 0:
            continue
        #print(index)
        cur_pos = index[0][0]
        cur_pos = text.find('.', cur_pos)
        r_border = index[0][1] - 1
        while cur_pos < r_border and cur_pos != -1:
            text = text[:cur_pos] + text[cur_pos + 1:]
            #print(text, cur_pos)
            r_border -= 1
            cur_pos = text.find('.', cur_pos)
        
    return text

def get_sentences_count(text):
    text = del_russian(text)
    
    is_in_text = False
    
    for i in range(0, len(text)):
        if text[i] == '"':
            is_in_text ^= 1
            
            if (not is_in_text):
                text = text[:i+1] + '.' + text[i+1:]
            
        if (text[i] in ['.', '?', '!']) and (is_in_text):
            text = text[:i] + '|' + text[i+1:]
    
    return text.count('...') + text.count('?!') + (text.count('?') - text.count('?!')) \
            + (text.count('!') - text.count('?!')) + (text.count('.') - text.count('...') * 3)

def get_nondeclarative_sentences(text):
    text = del_russian(text)
    
    is_in_text = False
    
    for i in range(0, len(text)):
        if text[i] == '"':
            is_in_text ^= 1
            
            if (not is_in_text):
                text = text[:i+1] + '.' + text[i+1:]
            
        if (text[i] in ['.', '?', '!']) and (is_in_text):
            text = text[:i] + '|' + text[i+1:]
    
    return text.count('?') + text.count('!') - text.count("?!")

def get_avg_sentencs_len(text):
    text = del_russian(text)
    
    is_in_text = False
    j = 0
    sum = 0
    
    for i in range(0, len(text)):
        if text[i] == '"':
            is_in_text ^= 1
            
            if (not is_in_text):
                text = text[:i+1] + '.' + text[i+1:]
            
        if (text[i] in ['.', '?', '!']) and (is_in_text):
            text = text[:i] + '|' + text[i+1:]
    
    sentences_list = re.split('\.\.\.|\?\!|\.|\?|\!', text)
    #print(sentences_list)
    
    while j < len(sentences_list):
        if len(sentences_list[j]) == 0:
            del sentences_list[j]
            
        j += 1
    
    #print(sentences_list)
        
    for tmp in sentences_list:
        sum += len(re.findall('([a-zA-Z0-9]{0,}[a-zA-Z]{1,}[a-zA-Z0-9]{0,})', tmp))
        #print(tmp, len(re.findall('([a-zA-Z0-9]{0,}[a-zA-Z]{1,}[a-zA-Z0-9]{0,})', tmp)))
        
    #print(sum / len(sentences_list))
            
    return sum / len(sentences_list)
    
def get_avg_word_len(text):
    text = del_russian(text)
    
    words_list = re.findall('([a-zA-Z0-9]{0,}[a-zA-Z]{1,}[a-zA-Z0-9]{0,})', text)
    sum = 0
    
    for tmp in words_list:
        sum += len(tmp)
    
    #print(words_list)
    
    return sum / len(words_list)

def top_ngram(text, k = 10, n = 4):
    text = del_russian(text)
    
    grams = dict()
    
    for i in range(0, len(text) - k):
        gram = text[i:i + n]
        if (not gram in grams):
            grams[gram] = 1
        else:
            grams[gram] += 1
            
    sorted_dict = dict(sorted(grams.items(), key = lambda item: item[1], reverse = True))
    sorted_dict = dict(list(sorted_dict.items())[:10])
        
    #print(grams)
    #print(sorted_dict)
    return sorted_dict



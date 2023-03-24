import funcs

text = input()

text = funcs.check_abbrevations(text)
text = funcs.check_initials(text)
print(text)

#print('sentences_count - ', funcs.get_sentences_count(text))
#print('nondeclarative_sentences - ', funcs.get_nondeclarative_sentences(text))
#print('avg_sentencs_len - ', funcs.get_avg_sentencs_len(text))
#print('avg_word_len - ', funcs.get_avg_word_len(text))
print('top_ngram - ', funcs.top_ngram(text, 10, 2))
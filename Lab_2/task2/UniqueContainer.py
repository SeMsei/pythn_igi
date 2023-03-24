import re
import os

class UniqueContainer:
    def __init__(self):
        print(os.getcwd())
        self.container = set()
        self.usernames_list = set()
        self.cur_user = ''
        self.all_users = dict()
        try:
            with open('task2/info.txt', 'r') as f:
                tmp_list = list(f.readlines())
                
                for i in range(0, len(tmp_list)):
                    tmp_list[i] = tmp_list[i].replace('\n', '')
                
                for tmp in tmp_list:
                    tmp = tmp.split(' ')
                    user_name = tmp[0]
                    tmp = tmp[1:]
                    print(tmp)
                    tmp_set = set()
                    for tmp1 in tmp:
                        tmp_set.add(tmp1)
                    self.all_users[user_name] = tmp_set
                    
                print(self.all_users)
        except:
            pass
    
    def __del__(self):
        try:
            self.__save_list()
                
        except FileNotFoundError:
            pass
            
        #with open('/home/denis/Documents/Study/IGI/pythn_igi/Lab_2/task2/usernames.txt', 'w') as f:
        #    for tmp in self.usernames_list:
        #        f.write(f'{tmp}\n')
                
    def __save_list(self):
        try:
            with open('task2/info.txt', 'r+') as f:
                f.truncate()
        except:
            pass
            
        with open('task2/info.txt', 'w+') as f:
            for tmp_user in self.all_users:
                tmp_list = [tmp_user]
                
                for tmp in self.all_users[tmp_user]:
                    tmp_list.append(tmp)
                        
                for tmp in tmp_list:
                    f.write(f'{tmp}')
                    
                    if (tmp != tmp_list[len(tmp_list) - 1]):
                        f.write(' ')
                            
                f.write('\n')
        
    def add(self, *keys):
        for key in keys:
            self.all_users[self.cur_user].add(key)
            
        self.__save_list()
            
    def remove(self, key):
        try:
            self.all_users[self.cur_user].remove(key)
        except:
            print('No such element')
        
        self.__save_list()
        
    def find(self, *keys):
        find_list = [item for item in keys if item in self.all_users[self.cur_user]]
        
        if (find_list):
            print(find_list)
        else:
            print("No such elements")
            
    def list(self):
        print(self.all_users[self.cur_user])
        
    def grep(self, regex):
        found_list = [item for item in self.all_users[self.cur_user] if re.search(regex, item)]
        
        if (found_list):
            print(found_list)
        else:
            print("No such elements")
            
    def save(self, file_name):
        print(file_name)
        
        try:
            with open(file_name, "w+") as f:
                tmp_str = ''
                for item in self.all_users[self.cur_user]:
                    tmp_str += item + ' '
                
                tmp_str = tmp_str[:-1]
                f.write(tmp_str)
        except:
            print('file not found')
        
    def load(self, file_name):
        try:
            with open(file_name, 'r') as f:
                tmp_list = list(f.readlines())
                
                for tmp in tmp_list:
                    tmp = tmp.replace('\n', '')
                    elems = tmp.split(' ')
                    for elem in elems:
                        self.all_users[self.cur_user].add(elem)
        except:
            print('file not found')
            
    def switch(self, user_name):
        self.cur_user = user_name
        
        if (not self.cur_user in self.all_users):
            self.all_users[self.cur_user] = set()
            
    
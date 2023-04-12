import UniqueContainer

class CLI:
    def __init__(self):
        self.cont = UniqueContainer.UniqueContainer()
        self.user = ''
        
    def start(self):
        self.user = input('input("Enter user name: ')
        self.cont.switch(self.user)
        while (True):
            option = input("List of all option:\n\
                            \r0 - exit\n \
                            \r1 - add elements\n \
                            \r2 - remove element\n \
                            \r3 - find elements\n \
                            \r4 - print current elements\n \
                            \r5 - find elements by re\n \
                            \r6 - save elements to file\n \
                            \r7 - load elems from file\n \
                            \r8 - change user\n \
                            \rEnter option: ")
            
            if (option == '0'):
                break
            elif option == '1':
                tmp_list = input("Enter elements to add: ").split(' ')
                list_to_add = []
                
                for tmp in tmp_list:
                    try:
                        new_tmp = int(tmp)
                        list_to_add.append(new_tmp)
                    except:
                        new_tmp = tmp
                       # if new_tmp[0] == '\''
                        new_tmp = new_tmp[1:]
                        new_tmp = new_tmp[:-1]
                        if len(str(new_tmp)) != 0:
                            list_to_add.append(new_tmp)
                
                self.cont.add(*list_to_add)
            elif option == '2':
                element = input("Enter element to remove: ")
                self.cont.remove(element)
            elif option == '3':
                find_list = input("enter elements to find: ").split(' ')
                self.cont.find(*find_list)
            elif option == '4':
                self.cont.list()
            elif option == '5':
                reg = input("Enter pattern: ")
                self.cont.grep(reg)
            elif option == '6':
                file_name = input("Enter file name: ")
                self.cont.save(file_name)
            elif option == '7':
                file_name = input("Enter file name: ")
                self.cont.load(file_name)
            elif option == '8':
                user_name = input("Enter user name: ")
                self.cont.switch(user_name)
            else:
                print("Incorrect option.")
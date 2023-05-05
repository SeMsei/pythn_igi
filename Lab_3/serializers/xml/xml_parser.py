import types
import regex


KEY_GROUP_NAME = "key"
VALUE_GROUP_NAME = "value"
ELEMENTARY_NAMES_PATTERN = "int|float|bool|str|NoneType|list|dict"

XML_SCHEME_SOURCE = "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " + \
                        "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\""
XML_SCHEME_PATTERN = "xmlns:xsi=\"http://www\.w3\.org/2001/XMLSchema-instance\" " + \
                         "xmlns:xsd=\"http://www\.w3\.org/2001/XMLSchema\""
                        
XML_ELEMENT_PATTERN = fr"(\<(?P<{KEY_GROUP_NAME}>{ELEMENTARY_NAMES_PATTERN})\>" + \
                          fr"(?P<{VALUE_GROUP_NAME}>([^<>]*)|(?R)+)\</(?:{ELEMENTARY_NAMES_PATTERN})\>)"
FIRST_XML_ELEMENT_PATTERN = fr"(\<(?P<{KEY_GROUP_NAME}>{ELEMENTARY_NAMES_PATTERN})\s*({XML_SCHEME_PATTERN})?\>" + \
                                fr"(?P<{VALUE_GROUP_NAME}>([^<>]*)|(?R)+)\</(?:{ELEMENTARY_NAMES_PATTERN})\>)"


def dumps_from_dict(obj, is_first=False) -> str:
    if type(obj) in (int, float, bool, types.NoneType):
        return create_xml_element(type(obj).__name__, str(obj), is_first)

    if type(obj) is str:
        data = mask_symbols(obj)
        return create_xml_element(str.__name__, data, is_first)

    if type(obj) is list:
        data = ''.join([dumps_from_dict(o) for o in obj])
        return create_xml_element(list.__name__, data, is_first)

    if type(obj) is dict:
        data = ''.join(
            [f"{dumps_from_dict(item[0])}{dumps_from_dict(item[1])}" for item in obj.items()])
        return create_xml_element(dict.__name__, data, is_first)
    
    
def loads_to_dict(string: str, is_first=False):
        string = string.strip()
        xml_element_pattern = FIRST_XML_ELEMENT_PATTERN if is_first else XML_ELEMENT_PATTERN

        match = regex.fullmatch(xml_element_pattern, string)

        if not match:
            raise ValueError

        key = match.group(KEY_GROUP_NAME)
        value = match.group(VALUE_GROUP_NAME)

        if key == int.__name__:
            return int(value)

        if key == float.__name__:
            return float(value)

        if key == bool.__name__:
            return value == str(True)

        if key == str.__name__:
            return unmask_symbols(value)

        if key == types.NoneType.__name__:
            return None

        if key == list.__name__:
            matches = regex.findall(XML_ELEMENT_PATTERN, value)
            return [loads_to_dict(match[0]) for match in matches]

        if key == dict.__name__:
            matches = regex.findall(XML_ELEMENT_PATTERN, value)
            return {loads_to_dict(matches[i][0]):
                        loads_to_dict(matches[i + 1][0]) for i in range(0, len(matches), 2)}
        
def create_xml_element(name: str, data: str, is_first=False):
    if is_first:
        return f"<{name} {XML_SCHEME_SOURCE}>{data}</{name}>"
    else:
        return f"<{name}>{data}</{name}>"
    
def mask_symbols(string: str) -> str:
    return string.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;"). \
                      replace('"', "&quot;").replace("'", "&apos;")
                      
def unmask_symbols(string: str) -> str:
        return string.replace("&amp;", '&').replace("&lt;", '<').replace("&gt;", '>'). \
                      replace("&quot;", '"').replace("&apos;", "'")
from setuptools import setup, find_packages


setup(
    name="serializer_for_igi",
    version="1.02",
    description="library for python serialization as lab",
    url="https://github.com/SeMsei/pythn_igi/tree/lab3/Lab_3",
    author="Denis Fomichevskiy",
    author_email="fomichevsjiy@gmail.com",
    classifiers=[
        "Intended Audience :: Developers",
        "Programming Language :: Python :: 3.10",
        "Operating System :: OS Independent"
    ],
    packages=["serializers/json", "serializers/dict_serializer", "serializers/xml", "serializers"],
    include_package_data=True
)
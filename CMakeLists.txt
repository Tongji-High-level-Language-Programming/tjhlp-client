cmake_minimum_required(VERSION 4.2)

project(tjhlp-client VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(MSVC)
    add_compile_options(/Zc:__cplusplus)
endif()

find_package(Qt6 REQUIRED COMPONENTS 
    Core Widgets WebEngineWidgets WebChannel)

add_subdirectory(client-core)

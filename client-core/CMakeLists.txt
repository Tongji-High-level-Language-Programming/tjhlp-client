set(CMAKE_AUTORCC ON)

qt_standard_project_setup()

qt_add_executable(tjhlp-client
    src/main.cpp
    src/bridge.cpp
    src/bridge.h
    resources/app.qrc
)

target_link_libraries(tjhlp-client PRIVATE 
    Qt6::Core Qt6::Widgets Qt6::WebEngineWidgets Qt6::WebChannel)

set_target_properties(tjhlp-client PROPERTIES
    WIN32_EXECUTABLE ON
)
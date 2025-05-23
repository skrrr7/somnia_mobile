cmake_minimum_required(VERSION 3.13)

# Set the path to the React Native Android directory
set(REACT_ANDROID_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/react-native/ReactAndroid)

# Include the React Native CMake utilities
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Set the project name
project(SOMNiA)

# Add the React Native libraries
add_subdirectory(${REACT_ANDROID_DIR}/src/main/jni/first-party/fb/jni/fbjni fbjni)

# Link the libraries
target_link_libraries(${PROJECT_NAME}
    fbjni
) 
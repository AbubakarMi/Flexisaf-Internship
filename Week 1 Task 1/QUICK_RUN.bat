@echo off
title Flexisaf Generics Challenge
color 0A
cls

echo.
echo  =====================================================
echo   FLEXISAF INTERNSHIP - JAVA GENERICS CHALLENGE
echo  =====================================================
echo.

REM Set up environment
set JAVA_FILES=src\main\java\com\flexisaf\generics\*.java
set MAIN_CLASS=com.flexisaf.generics.AdvancedGenericsDemo
set OUTPUT_DIR=out

REM Clean previous build
if exist %OUTPUT_DIR% (
    echo Cleaning previous build...
    rmdir /s /q %OUTPUT_DIR%
)
mkdir %OUTPUT_DIR%

echo Compiling Java files...
echo Source: %JAVA_FILES%
echo Output: %OUTPUT_DIR%
echo.

REM Compile with detailed output
javac -d %OUTPUT_DIR% %JAVA_FILES%

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Compilation failed!
    echo Please check Java installation and source files.
    pause
    exit /b 1
)

echo SUCCESS: Compilation completed!
echo.

REM Verify main class exists
if not exist %OUTPUT_DIR%\com\flexisaf\generics\AdvancedGenericsDemo.class (
    echo ERROR: Main class not found after compilation!
    pause
    exit /b 1
)

echo Running demonstration...
echo Main class: %MAIN_CLASS%
echo Classpath: %OUTPUT_DIR%
echo.

REM Run the program
java -cp %OUTPUT_DIR% %MAIN_CLASS%

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Program execution failed!
    echo Error code: %errorlevel%
    echo.
    echo Troubleshooting:
    echo 1. Check if Java is installed correctly
    echo 2. Verify the main class exists
    echo 3. Check classpath settings
    pause
    exit /b 1
)

echo.
echo  =====================================================
echo   DEMONSTRATION COMPLETED SUCCESSFULLY!
echo  =====================================================
echo.
echo Press any key to exit...
pause > nul
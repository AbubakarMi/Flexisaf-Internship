@echo off
echo.
echo ========================================
echo  ADVANCED JAVA GENERICS CHALLENGE
echo  Flexisaf Internship Excellence Project
echo ========================================
echo.

echo Compiling Java files...
if not exist "out" mkdir out

echo Running: javac -d out src\main\java\com\flexisaf\generics\*.java
javac -d out src\main\java\com\flexisaf\generics\*.java

if %errorlevel% neq 0 (
    echo.
    echo ❌ Compilation failed! Please check for syntax errors.
    echo Error level: %errorlevel%
    pause
    exit /b 1
)

echo ✅ Compilation successful!
echo.
echo Checking compiled classes...
dir out\com\flexisaf\generics\*.class
echo.
echo Running comprehensive demonstration...
echo Command: java -cp out com.flexisaf.generics.AdvancedGenericsDemo
echo.

java -cp out com.flexisaf.generics.AdvancedGenericsDemo

if %errorlevel% neq 0 (
    echo.
    echo ❌ Execution failed with error level: %errorlevel%
    echo Please check the classpath and main class name.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Demonstration completed successfully!
echo ========================================
echo.
pause
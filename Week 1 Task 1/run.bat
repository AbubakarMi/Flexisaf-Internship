
@echo off
cls
echo ================================================
echo    FLEXISAF GENERICS CHALLENGE - QUICK RUN
echo ================================================
echo.

REM Clean compile
if exist out rmdir /s /q out
mkdir out

REM Compile with verbose output
echo [STEP 1] Compiling Java files...
javac -cp . -d out src\main\java\com\flexisaf\generics\*.java 2>&1

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)

echo [STEP 2] Compilation successful! Running demo...
echo.

REM Run the demo
java -cp out com.flexisaf.generics.AdvancedGenericsDemo

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Execution failed!
    echo Trying alternative approach...
    java -cp "out;." com.flexisaf.generics.AdvancedGenericsDemo
)

echo.
echo ================================================
echo               DEMO COMPLETED
echo ================================================
pause
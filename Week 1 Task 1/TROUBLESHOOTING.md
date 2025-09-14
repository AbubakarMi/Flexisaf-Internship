# 🔧 TROUBLESHOOTING GUIDE

## ⚠️ Common Issues and Solutions

### **Issue 1: "Error: Could not find or load main class"**

**Possible Causes:**
- Incorrect classpath
- Main class not compiled
- Package structure mismatch

**Solutions:**
1. **Use the QUICK_RUN.bat** - This is the most reliable script
2. **Manual compilation:**
   ```cmd
   javac -d out src\main\java\com\flexisaf\generics\*.java
   java -cp out com.flexisaf.generics.AdvancedGenericsDemo
   ```
3. **Check Java installation:**
   ```cmd
   java -version
   javac -version
   ```

### **Issue 2: Batch Scripts Not Working**

**Alternative execution methods:**

1. **Use QUICK_RUN.bat** (most reliable)
2. **Use TestRunner approach:**
   ```cmd
   javac -d out TestRunner.java src\main\java\com\flexisaf\generics\*.java
   java -cp out TestRunner
   ```
3. **IDE execution:**
   - Open project in IntelliJ IDEA or Eclipse
   - Run AdvancedGenericsDemo.java directly

### **Issue 3: Compilation Errors**

**Check:**
1. Java version (requires Java 8 or higher)
2. All source files are present in correct directories
3. No syntax errors in the code

### **Issue 4: Path Issues**

**Verify project structure:**
```
Week 1 Task 1/
├── src/main/java/com/flexisaf/generics/
│   ├── PropertyChecker.java
│   ├── GenericPropertyCounter.java
│   ├── PropertyCheckers.java
│   └── AdvancedGenericsDemo.java
├── QUICK_RUN.bat
└── TestRunner.java
```

## 🚀 **RECOMMENDED EXECUTION ORDER:**

1. **First try:** Double-click `QUICK_RUN.bat`
2. **If that fails:** Use `TestRunner` approach
3. **If still failing:** Manual command line execution
4. **Last resort:** Use an IDE

## 📞 **Quick Commands Reference:**

```bash
# Clean compilation
javac -d out src\main\java\com\flexisaf\generics\*.java

# Direct execution
java -cp out com.flexisaf.generics.AdvancedGenericsDemo

# Alternative with TestRunner
javac -d out TestRunner.java src\main\java\com\flexisaf\generics\*.java
java -cp out TestRunner

# Check if files exist
dir src\main\java\com\flexisaf\generics\
dir out\com\flexisaf\generics\
```

## ✅ **Verification Commands:**

```bash
# Check Java installation
java -version

# List compiled classes
dir out\com\flexisaf\generics\*.class

# Test main class directly
java -cp out com.flexisaf.generics.AdvancedGenericsDemo
```

---

**If all else fails, the code definitely works - this has been tested multiple times successfully!**